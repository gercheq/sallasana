import datetime

from celery.result import AsyncResult
from celery.states import STARTED

from social.pipeline.partial import partial

from app.models import FBProfile
from api.tasks import create_fb_users_from_friend


@partial
def create_update_fb_user(strategy, response, user=None, *args, **kwargs):
    fb_data = response

    # Id coming from the response interferes with the object id
    # so we'll change it's name to fb_id
    fb_data['fb_id'] = fb_data['id']
    del fb_data['id']

    # Adding the last update time
    fb_data['time_updated'] = datetime.datetime.now()

    # Creating the fb user
    created_fb_profile = FBProfile(**fb_data)

    # Save the access token in the session
    access_token = response['access_token']
    strategy.session['access_token'] = access_token

    prev_task = None

    # Celery Task to create
    #if created_fb_user.__dict__.get('last_celery_task_id'):
    #    prev_task = AsyncResult(created_fb_user.last_celery_task_id)

    #if prev_task and prev_task.state != STARTED:
    #    print "task already running, skipping this time."
    #else:
    celery_task = create_fb_users_from_friend.delay(created_fb_profile, access_token)

    print "===================="
    print celery_task
    print "===================="
        #
        #created_fb_user.update(set__latest_celery_task_id=str(celery_task), upsert=True)
        #created_fb_user.save()
