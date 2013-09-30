import datetime

import facebook
from mongoengine import DoesNotExist
from social.pipeline.partial import partial
from app.models import FBUser

from api.core import create_user_from_friend

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


    """
    GET INFO FROM FACEBOOK
    """

    graph_api = facebook.GraphAPI(access_token)

    # Add friends
    friends = graph_api.get_object('me/friends')['data']


    # Saving friends
    user.friends = friends
    user.save()

    # Saving user picture
    user_picture = graph_api.get_object('me', fields='picture.height(1200).width(1200)')
    user.picture = user_picture
    user.save()


    # Creating a user for each friend
    for friend_summary in friends:

        try:
            # is my friend in the db?
            fb_user = FBUser.objects.get(fb_id=friend_summary['id'])
            if fb_user:
                print "%s already in db, skipping" % friend_summary['id']
                continue
        except DoesNotExist:
            friend = graph_api.get_object(friend_summary['id'])
            friend_picture = graph_api.get_object(friend_summary['id'], fields='picture.height(1200).width(1200)')

            friend['picture'] = friend_picture

            print "adding %s to db" % friend_summary['id']
            create_user_from_friend(friend)


