__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

import datetime

from mongoengine.errors import NotUniqueError
from social.pipeline.partial import partial

from app.models import FBProfile
from api.tasks import update_fb_profile


@partial
def create_update_fb_user(strategy, response, user=None, *args, **kwargs):
    fb_response = response

    # ID coming from the response interferes with the object id
    # so we'll change it's name to fb_id
    fb_response['fb_id'] = fb_response['id']
    del fb_response['id']

    # Adding the last update time
    fb_response['time_updated'] = datetime.datetime.now()

    # Saving the users FB information on MongoDB
    try:
        # Trying to create the FBProfile
        created_fb_profile = FBProfile(**fb_response)
        created_fb_profile.save()
        fb_profile = created_fb_profile

    except NotUniqueError:
        # Updating most current information if already exists
        fb_profile = FBProfile.objects.get(fb_id=fb_response['fb_id'])

        # This is unique so we don't set this again
        del fb_response['fb_id']

        for field in fb_response.keys():
            # Setting updated values
            setattr(fb_profile, field, fb_response[field])

        fb_profile.save()

    access_token = fb_response['access_token']

    celery_task_id = update_fb_profile.delay(fb_profile, access_token)

    print "===================="
    print celery_task_id
    print "===================="
