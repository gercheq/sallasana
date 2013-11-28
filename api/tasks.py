
from celery import task

import facebook
from mongoengine import DoesNotExist

from app.models import FBProfile


@task()
def update_fb_profile(fb_profile, access_token):
    graph_api = facebook.GraphAPI(access_token)

    friends_up_to_date = False

    # Get friends
    friends = graph_api.get_object('me/friends')['data']

    # Creating a dictionary where the key is fb_id and value is fb_name
    friend_id_to_name_dict = dict()

    for friend_profile in friends:
        friend_id_to_name_dict[friend_profile.get('id')] = friend_profile.get('name')

    # Saving friends
    if not fb_profile.friends == friend_id_to_name_dict:
        # TODO: (Renan) Optimize the friend profile creating section
        # by only creating profiles of the new added friends instead of
        # checking all.
        friends_up_to_date = False
        print "Friends are not up to date. I'll update them now."
    else:
        friends_up_to_date = True
        print "Friends are up to date."

    # Saving user picture
    user_picture = graph_api.get_object('me', fields='picture.height(1024).width(1024)')
    fb_profile.picture = user_picture
    fb_profile.save(safe=True)

    # Creating a Facebook Profile for each friend
    # skips if already exists
    if not friends_up_to_date:
        fb_profile.friends = friend_id_to_name_dict
        fb_profile.save()

        for profile in friends:
            try:
                # is my friend in the db?
                fb_user = FBProfile.objects.get(fb_id=profile['id'])

                # Adding self as friend
                fb_user.friends[fb_profile['fb_id']] = fb_profile['name']
                fb_user.save()

                print "%s already in db, skipping" % profile['id']

            except DoesNotExist:
                """
                SAVE FRIENDS PROFILE (Doesn't creates a SallasanaUser)
                """

                #TODO: (Renan) What happens when someone with a Generated Profile Signs Up
                #TODO: (Renan) What happens when one of these lines fails?

                friend_profile = graph_api.get_object(profile['id'])
                friend_picture = graph_api.get_object(profile['id'], fields='picture.height(1024).width(1024)')

                print "adding %s to db" % profile['id']

                # Replacing id with fb_id so it doesn't get mixed with MongoDB id
                friend_profile['fb_id'] = profile['id']
                del friend_profile['id']

                friend_profile['picture'] = friend_picture
                friend_profile['is_generated_user'] = True

                # Adding self as a friend
                friend_profile['friends'] = {}
                friend_profile['friends'][fb_profile['fb_id']] = fb_profile['name']

                generated_profile = FBProfile(**friend_profile)
                generated_profile.save()

    return True
