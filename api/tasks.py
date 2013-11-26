
from celery import task

import facebook
from mongoengine import DoesNotExist

from app.models import FBProfile
from api.core import create_user_from_friend


@task()
def create_fb_users_from_friend(created_fb_profile, access_token):
    graph_api = facebook.GraphAPI(access_token)

    ## Add friends
    friends = graph_api.get_object('me/friends')['data']

    friend_id_to_name_dict = dict()

    for friend in friends:
        friend_id_to_name_dict[friend.get('id')] = friend.get('name')

    import pdb; pdb.set_trace()

    # Saving friends
    created_fb_profile.update(set__friends=friend_id_to_name_dict)
    created_fb_profile.save()

    # Saving user picture
    user_picture = graph_api.get_object('me', fields='picture.height(1024).width(1024)')
    created_fb_profile.picture = user_picture
    created_fb_profile.save(safe=True)

    # Creating a user for each friend
    for friend_summary in friends:
        try:
            # is my friend in the db?
            fb_user = FBProfile.objects.get(fb_id=friend_summary['id'])
            if fb_user:
                print "%s already in db, skipping" % friend_summary['id']
                continue
        except DoesNotExist:
            friend = graph_api.get_object(friend_summary['id'])
            friend_picture = graph_api.get_object(friend_summary['id'], fields='picture.height(1024).width(1024)')

            friend['picture'] = friend_picture

            print "adding %s to db" % friend_summary['id']
            create_user_from_friend(friend)

    return True
