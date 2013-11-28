from django.core.mail import send_mail
from django.db import models
from django.contrib.auth.models import User

from datetime import datetime
from django.db.models import ForeignKey
from django.utils import timezone
from mongoengine import *

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils.http import urlquote
from django.contrib.auth.models import BaseUserManager


class FBProfile(DynamicDocument):
    fb_id = StringField(required=True, unique=True)
    username = StringField()
    access_token = StringField()

    friends = DynamicField()

    is_generated_user = BooleanField(default=False)

    time_created = DateTimeField(default=datetime.now())
    time_updated = DateTimeField(default=datetime.now())
    time_deleted = DateTimeField(default=None)

    meta = {
        'indexes': ['email', 'fb_id', 'username']
    }

    @property
    def avatar(self):
        return self.picture['picture']['data']


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

    #fb_id = models.CharField(_('facebook id'), max_length=255, blank=True)
    #fb_username = models.CharField(_('facebook user name'), max_length=255, blank=True)

    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)

    is_staff = models.BooleanField(_('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin '
                    'site.'))
    is_active = models.BooleanField(_('active'), default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))

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
        social_auth = self.social_auth.get()
        return social_auth.uid

    @property
    def fb_profile(self):
        """
        Returns the Facebook profile stored in MongoDB
        """
        return FBProfile.objects.get(fb_id=self.fb_id)


#class Like(models.Model):
#    user = ForeignKey(User)
#    #liked_fb_profile = ForeignKey(FBProfile)
#
#
#class Dislike(models.Model):
#    user = ForeignKey(User)
    #disliked_fb_profile = ForeignKey(FBProfile)

#class User(Document):
#    email = EmailField(required=True)
#    fb_uid = StringField(required=True)
#
#    first_name = StringField()
#    last_name = StringField()
#
#    fb_friends = ListField(field=FBProfile)
#
#    time_created = DateTimeField(default=datetime.datetime.now)
#    time_updated = DateTimeField(default=datetime.datetime.now)
#    time_deleted = DateTimeField(default=None)
#
#    meta = {
#        'indexes': ['email', 'fb_uid']
#    }


