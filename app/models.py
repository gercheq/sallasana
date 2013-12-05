# -*- coding: utf-8 -*-

__author__ = 'Renan Cakirerk <renan@cakirerk.org>'


from mongoengine import *
from datetime import datetime

from django.core.mail import send_mail
from django.db import models
from django.db.models import ForeignKey
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils.http import urlquote
from django.contrib.auth.models import BaseUserManager


"""
MONGODB MODELS
"""


class Location(DynamicDocument):
    """
    Example queries:
        db.location.find({position: { $near : { $geometry :  { type : "Point" , coordinates : [-122.255833, 37.79885] },  $maxDistance : 14800 } } } )
        Location.objects(position__near=[-122.255833, 37.79885], position__max_distance=14700)

    Example addresses:
        Degrees Converted to Decimal via http://boulter.com/gps/#37%B0%2047.117%27%2C%20-122%B0%2025.368%27

        150 Franklin St.
        37° 46.553', -122° 25.256'
        Decimal -> Lat 37.775883, Long -122.420933

        0.7 Miles or 1.1265408 kilometers or 1126.54 meters to:

        1188 Franklin St.
        37° 47.117', -122° 25.368'
        Decimal -> Lat 37.785283, Long -122.4228

        14.2 Miles or 22.8527 kilometers or 22852.68 meters to:

        1444 1st Ave Pl Oakland, CA 94606
        37° 47.931', -122° 15.350'
        Decimal -> Lat 37.79885, Long -122.255833
    """

    user_id = LongField(required=True)
    time_created = DateTimeField(default=datetime.now())
    position = PointField(required=True)  # [long, lat] -> google gives [Lat, Long]

    def near(self, meters):
        """
        Returns the closest points in <meters> radius
        """
        lng = self.position['coordinates'][0]
        lat = self.position['coordinates'][1]

        return Location.objects(position__near=[lng, lat], position__max_distance=meters)


class Recommendations(DynamicDocument):
    """
    Stores the temporary recommendations and views for caching purposes
    """
    user_id = LongField(required=True, unique=True)
    recommendation_views = DynamicField(default=[])
    recommendations = DynamicField(default=[])


class Taste(DynamicDocument):
    """
    Stores who a user liked or disliked
    """
    user_id = LongField(required=True, unique=True)

    # These will carry data as:
    # likes[user_id] = counter
    # we might show the same user
    # occasionally so we would like to track it
    likes = DynamicField(default={})
    dislikes = DynamicField(default={})


class Matches(DynamicDocument):
    """
    Stores a users matches
    """
    user_id = LongField(required=True, unique=True)
    matches = DynamicField(default={})


class FBLike(DynamicDocument):
    """
    Stores Facebook Like Objects
    """

    l_id = LongField()

    time_created = DateTimeField(default=datetime.now())
    time_updated = DateTimeField(default=datetime.now())

    meta = {
        'indexes': ['l_id']
    }


class FBProfile(DynamicDocument):
    fb_id = StringField(required=True, unique=True)
    username = StringField()

    first_name = StringField(default=None)
    last_name = StringField(default=None)
    gender = StringField(default=None)
    birthday = StringField(default=None)

    friends = DynamicField()
    likes = DynamicField()

    is_generated_user = BooleanField(default=False)

    time_created = DateTimeField(default=datetime.now())
    time_updated = DateTimeField(default=datetime.now())
    time_deleted = DateTimeField(default=None)

    meta = {
        'indexes': ['email', 'fb_id', 'username']
    }

    @property
    def avatar(self):
        # TODO: (renan) Avatar size
        return self.picture['picture']['data']

    def common_likes(self, user):
        """
        Returns the common likes with another users Facebook Profile
        """

        self_like_ids = set(self.likes.keys()) if self.likes else set()
        other_like_ids = set(user.fb_profile.likes.keys()) if user.fb_profile.likes else set()

        common_like_ids = self_like_ids.intersection(other_like_ids)

        return common_like_ids

    def common_friends(self, user):
        """
        Returns the common friends with another users Facebook Profile
        """

        self_friend_ids = set(self.friends.keys()) if self.friends else set()
        other_friend_ids = set(user.fb_profile.friends.keys()) if user.fb_profile.friends else set()

        common_friend_ids = self_friend_ids.intersection(other_friend_ids)

        return common_friend_ids


"""
POSTGRESQL MODELS
"""


class SallasanaUserManager(BaseUserManager):

    def _create_user(self, email, password,
                     is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser, last_login=now,
                          date_joined=now, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False, False,
                                 **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True,
                                 **extra_fields)


class SallasanaUser(AbstractBaseUser, PermissionsMixin):
    """
    A fully featured User model with admin-compliant permissions that uses
    a full-length email field as the username.

    Email and password are required. Other fields are optional.
    """

    email = models.EmailField(_('email address'), max_length=255, unique=True)

    first_name = models.CharField(_('first name'), max_length=255, blank=True)
    last_name = models.CharField(_('last name'), max_length=255, blank=True)

    is_staff = models.BooleanField(_('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin site.'))

    is_active = models.BooleanField(_('active'), default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))

    # This is for simulating Foreign Key with a MongoDB object
    most_recent_location_id = models.CharField(_('most recent position'), max_length=64, blank=True)

    interest_radius = models.IntegerField(default=100, blank=True)
    interest_gender = models.IntegerField(default=0, blank=True)
    interest_age_min = models.IntegerField(default=18, blank=True)
    interest_age_max = models.IntegerField(default=24, blank=True)

    # This gives a point to let the recommendation engine know where to start in the user db
    last_seeked_user_index = models.BigIntegerField(default=0, blank=True)

    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = SallasanaUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_absolute_url(self):
        return "/users/%s/" % urlquote(self.email)

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """
        Returns the short name for the user.
        """
        return self.first_name

    def email_user(self, subject, message, from_email=None):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email])

    @property
    def access_token(self):
        """
        Returns the current access token
        """
        social_auth = self.social_auth.get()
        return social_auth.tokens

    @property
    def fb_id(self):
        """
        Returns the persons Facebook User ID
        """
        social_auth = self.social_auth.latest('id')
        return social_auth.uid

    @property
    def fb_profile(self):
        """
        Returns the Facebook profile stored in MongoDB
        """
        return FBProfile.objects.get(fb_id=self.fb_id)

    def set_most_recent_coordinates(self, lon, lat):
        """
        Sets the latest known coordinates of the user
        """
        location = Location(uid=self.id, position=[lon, lat])
        location.save()

        self.most_recent_location_id = str(location.id)
        self.save()

    @property
    def most_recent_coordinates(self):
        """
        Returns the latest known coordinates of the user
        """
        location = Location.objects.get(id=self.most_recent_location_id)

        return location.position['coordinates']

    def users_nearby(self, meters):
        """
        Returns the user objects that are in <meters> radius
        """
        location = Location.objects.get(id=self.most_recent_location_id)
        lng = location.position['coordinates'][0]
        lat = location.position['coordinates'][1]

        nearby_locations = Location.objects(position__near=[lng, lat], position__max_distance=meters)

        nearby_user_ids = []

        for loc in nearby_locations:
            nearby_user_ids.append(loc.uid)

        return SallasanaUser.objects.filter(id__in=nearby_user_ids)

    def get_recommendations(self):
        """
        Returns the recommendations for the user
        """

        try:
            recommendations = Recommendations.objects.get(user_id=self.id)
        except DoesNotExist:
            print "No recommendation object found. Creating one now."
            recommendations = Recommendations(user_id=self.id)
            recommendations.save()

        return recommendations


    def get_taste(self):
        """
        Returns the taste of the user
        """

        try:
            taste = Taste.objects.get(user_id=self.id)
        except DoesNotExist:
            print "No taste object found. Creating one now."
            taste = Taste(user_id=self.id)
            taste.save()

        return taste