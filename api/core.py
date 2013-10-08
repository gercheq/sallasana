from mongoengine import DoesNotExist
from app.models import FBUser

from django.db.models import Q


def create_user_from_friend(friend):
    friend['is_generated_user'] = True
    generated_user = FBUser(**friend)
    generated_user.save()
    print 'ok'


def get_fb_user(query=None):
    try:
        if query:
            print query
            user = FBUser.objects.filter(username=query) or FBUser.objects.filter(fb_id=query) or FBUser.objects.filter(email=query)
        else:
            user = FBUser.objects.all()
    except DoesNotExist:
        user = None

    return user