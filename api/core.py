from mongoengine import DoesNotExist
from app.models import FBUser

def create_user_from_friend(friend):
    friend['is_generated_user'] = True
    generated_user = FBUser(**friend)
    generated_user.save()
    print 'ok'

def get_fb_user(username=None, fb_id=None, email=None):
    try:
        if username:
            user = FBUser.objects.get(username=username)
        elif fb_id:
            user = FBUser.objects.get(fb_id=fb_id)
        elif email:
            user = FBUser.objects.get(email=email)
        else:
            user = FBUser.objects.all()
    except DoesNotExist:
        user = None

    return user