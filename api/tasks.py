import facebook
from celery import task
from mongoengine import DoesNotExist

from app.models import FBUser
from api.core import create_user_from_friend


@task()
def create_fb_users_from_friends(user, access_token):
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

    return True