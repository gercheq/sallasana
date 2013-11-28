from mongoengine import DoesNotExist
from app.models import FBProfile

from django.db.models import Q


def like(user, liked_user):
    # is_match(user, liked_user)
    pass


def is_match(user, liked_user):
    pass


def dislike(user, like):
    pass

def recommendations(user):
    pass