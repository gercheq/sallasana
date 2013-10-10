import datetime
from social.pipeline.partial import partial

from app.models import FBUser
from api.tasks import create_fb_users_from_friends


@partial
def create_update_fb_user(strategy, response, user=None, *args, **kwargs):
    fb_data = response

    # Id coming from the response interferes with the object id
    # so we'll change it's name to fb_id
    fb_data['fb_id'] = fb_data['id']
    del fb_data['id']

    # Adding the last update time
    fb_data['time_updated'] = datetime.datetime.now()

    # Creating the user
    fb_user = FBUser(**fb_data)
    fb_user.save()

    # Save the access token in the session
    access_token = response['access_token']
    strategy.session['access_token'] = access_token

    # Saving the access token in sallasana user
    if user:
        user.access_token = access_token
        user.save()

    # Celery Task
    create_fb_users_from_friends.delay(fb_user, access_token)