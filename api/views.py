__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from app.models import *

import json
from bson import json_util

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from common.utils import render_json

from app.facades import UserView
from app.constants import GENDER

from api.constants import SEARCH_WINDOW
from api.constants import MAX_RECOMMENDATIONS
from api.constants import RESET_RECOMMENDATION_VIEWS_CACHE

from mongoengine import DoesNotExist

def remove_user_from_recommendations(user_id, recommendations):
    # Removing user from recommendations
    recommendations.update(pull__recommendations=int(user_id))

    # Removing user from recommendation views
    for view in recommendations.recommendation_views:
        if view['id'] == int(user_id):
            recommendations.update(pull__recommendation_views=view)
            break

@login_required
def like(request, user_id):
    response = {'success': False}

    me = request.user
    my_recs = me.get_recommendations()
    my_taste = me.get_taste()

    # If the user_id that he is trying to like is not
    # in his recommendations, return false
    # to prevent liking anyone in the db
    try:
        my_recs.recommendations.index(int(user_id))
    except ValueError:
        return render_json(response)

    # Counting how many times I liked this user (see Taste doc in models)
    if user_id in my_taste.likes:
        # Fucking mongodb queries makes me sick...
        # This is for incrementing the counter in {user_id: counter}
        my_taste.update(**{'inc__likes__%s' % user_id: 1})
    else:
        my_taste.likes = {user_id: 1}
        my_taste.save()

    remove_user_from_recommendations(user_id, my_recs)

    response['success'] = True

    return render_json(response)


@login_required
def dislike(request, user_id):
    response = {'success': False}

    me = request.user
    my_recs = me.get_recommendations()
    my_taste = me.get_taste()

    # If the user_id that he is trying to like is not
    # in his recommendations, return false
    # to prevent liking anyone in the db
    try:
        my_recs.recommendations.index(int(user_id))
    except ValueError:
        return render_json(response)

    # Counting how many times I liked this user (see Taste doc in models)
    if user_id in my_taste.dislikes:
        # Fucking mongodb queries makes me sick...
        # This is for incrementing the counter in {user_id: counter}
        my_taste.update(**{'inc__dislikes__%s' % user_id: 1})
    else:
        my_taste.dislikes = {user_id: 1}
        my_taste.save()

    remove_user_from_recommendations(user_id, my_recs)

    response['success'] = True

    return render_json(response)


@login_required
def match(request):
    response = {}
    return render_json(response)


@login_required
def ping(request):
    response = {}
    return render_json(response)


@login_required
def recommendations(request):
    response = {'recs': None}

    me = request.user

    my_recs = me.get_recommendations()

    if RESET_RECOMMENDATION_VIEWS_CACHE:
        start_temp = request.user.last_seeked_user_index
        start = start_temp - SEARCH_WINDOW

        if start < 0:
            start = 0

        stop = start + SEARCH_WINDOW

    else:
        # If there are still recommendations in my bucket, return them
        if len(my_recs.recommendations) > 0:
            print "This user still has users to like"
            response['recs'] = my_recs.recommendation_views
            return render_json(response)

        start = request.user.last_seeked_user_index
        stop = start + SEARCH_WINDOW

    users = SallasanaUser.objects.all()[start:stop]

    # TODO: Renan separate this as a neat function
    # If there is less users than the search window
    # the end will become the starting point plus the
    # number of users found
    me.last_seeked_user_index = start + users.count()
    me.save()

    new_rec_views = []
    new_recs = []

    for user in users:
        # Don't return myself
        if user == request.user:
            continue

        user_view = UserView(user, me).to_dict()

        # Filter according to the user settings
        # TODO: Renan do this in the sql query
        # TODO: Add the location filtering
        if GENDER[user_view['gender']] == request.user.interest_gender:
            new_rec_views.append(user_view)
            new_recs.append(user.id)

    # Saving these to my recommendations list
    my_recs.recommendation_views = new_rec_views
    my_recs.recommendations = new_recs
    my_recs.save()

    response['recs'] = new_rec_views

    #user = request.user
    return render_json(response)
