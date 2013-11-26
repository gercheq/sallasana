from mongoengine import DoesNotExist
from app.models import FBProfile

from django.db.models import Q


def create_user_from_friend(friend):
    friend['is_generated_user'] = True
    generated_user = FBProfile(**friend)
    generated_user.save()
    print 'ok'


def like(user, liked_user):

    # is_match(user, liked_user)
    pass


def is_match(user, liked_user):
    pass


def dislike(user, like):
    pass

def recommendations(user):
    pass