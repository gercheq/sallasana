__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

import facebook

from celery import task
from mongoengine import DoesNotExist

from app.models import FBProfile
from app.models import FBLike


@task()
def update_fb_profile(fb_profile, access_token):
    graph_api = facebook.GraphAPI(access_token)

    """
    LIKE OPERATIONS
    """
    likes_up_to_date = False

    # Get likes
    likes = graph_api.get_object('me/likes', limit=1000000)['data']

    # Creating a dictionary where the key is l_id and value is l_name
    like_id_to_name_dict = dict()

    for like in likes:
        like_id_to_name_dict[like.get('id')] = like.get('name')

    # Saving likes
    if not fb_profile.likes == like_id_to_name_dict:
        likes_up_to_date = False
        print "Likes are not up to date. I'll update them now."
    else:
        likes_up_to_date = True
        print "Likes are up to date"

    if not likes_up_to_date:
        # Saving likes to FBProfile
        fb_profile.likes = like_id_to_name_dict
        fb_profile.save()

        for like in likes:
            try:
                # is like in the db?
                fb_like = FBLike.objects.get(l_id=like['id'])

                print "Like %s already in db, skipping" % like['id']

            except DoesNotExist:
                # Creating a Like object

                like_context = graph_api.get_object(like['id'])

                print "adding like %s to db" % like['id']

                like_context['l_id'] = like['id']
                del like_context['id']

                new_like = FBLike(**like_context)
                new_like.save()

    """
    FRIENDS OPERATIONS
    """
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

    if not friends_up_to_date:
        # Saving friend dict to profile
        fb_profile.friends = friend_id_to_name_dict
        fb_profile.save()

        # Creating a Facebook Profile for each friend
        # skips if already exists
        for profile in friends:
            try:
                # is my friend in the db?
                friend_profile = FBProfile.objects.get(fb_id=profile['id'])

                # Adding self as friend
                friend_profile.friends[fb_profile['fb_id']] = fb_profile['name']
                friend_profile.save()

                print "Profile %s already in db, skipping" % profile['id']

            except DoesNotExist:
                """
                SAVE FRIENDS PROFILE (Doesn't creates a SallasanaUser)
                """

                #TODO: (Renan) What happens when someone with a Generated Profile Signs Up
                #TODO: (Renan) What happens when one of these lines fails?

                friend_profile = graph_api.get_object(profile['id'])
                friend_picture = graph_api.get_object(profile['id'], fields='picture.height(1024).width(1024)')

                print "adding profile %s to db" % profile['id']

                # Replacing id with fb_id so it doesn't get mixed with MongoDB id
                friend_profile['fb_id'] = profile['id']
                del friend_profile['id']

                friend_profile['picture'] = friend_picture
                friend_profile['is_generated_user'] = True

                # Adding self as a friend
                friend_profile['friends'] = {}
                friend_profile['friends'][fb_profile['fb_id']] = fb_profile['name']

                new_profile = FBProfile(**friend_profile)
                new_profile.save()

    return True
