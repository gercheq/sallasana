import datetime

from celery.result import AsyncResult
from celery.states import STARTED
from mongoengine.errors import NotUniqueError
from social.pipeline.partial import partial

from app.models import FBProfile
from api.tasks import update_fb_profile


@partial
def create_update_fb_user(strategy, response, user=None, *args, **kwargs):
    fb_response = response

    # Id coming from the response interferes with the object id
    # so we'll change it's name to fb_id
    fb_response['fb_id'] = fb_response['id']
    del fb_response['id']

    # Adding the last update time
    fb_response['time_updated'] = datetime.datetime.now()

    # Saving the users FB information on MongoDB
    try:
        created_fb_profile = FBProfile(**fb_response)
        created_fb_profile.save()
        fb_profile = created_fb_profile
    except NotUniqueError:
        fb_profile = FBProfile.objects.get(fb_id=fb_response['fb_id'])

    access_token = fb_response['access_token']

    prev_task = None

    # Celery Task to create
    #if created_fb_user.__dict__.get('last_celery_task_id'):
    #    prev_task = AsyncResult(created_fb_user.last_celery_task_id)

    #if prev_task and prev_task.state != STARTED:
    #    print "task already running, skipping this time."
    #else:
    celery_task = update_fb_profile.delay(fb_profile, access_token)

    print "===================="
    print celery_task
    print "===================="
        #
        #created_fb_user.update(set__latest_celery_task_id=str(celery_task), upsert=True)
        #created_fb_user.save()
