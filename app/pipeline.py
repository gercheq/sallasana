import datetime

from celery.result import AsyncResult
from celery.states import STARTED

from social.pipeline.partial import partial

from app.models import FBUser
from api.tasks import create_fb_users_from_friends


@partial
def create_or_update_fb_user(response, *args, **kwargs):
    fb_data = response

    # Id coming from the response interferes with the object id
    # so we'll change it's name to fb_id
    fb_data['fb_id'] = fb_data['id']
    del fb_data['id']

    # Adding the last update time
    fb_data['time_updated'] = datetime.datetime.now()

    # Creating the fb user from this guy
    created_fb_user = FBUser(**fb_data)

    access_token = response['access_token']

    # Creating FBUser's from this guys friends
    create_fb_users_from_friends.delay(created_fb_user, access_token)
