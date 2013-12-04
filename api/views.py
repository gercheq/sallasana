__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from app.models import *

import json
from bson import json_util

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from common.utils import render_json

from app.facades import UserView
from app.constants import GENDER

@login_required
def like(request):
    # Security Check:
    # Check if the user is trying to like a user that is in his matches
    response = {}
    return render_json(response)


@login_required
def dislike(request):
    response = {}
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
    recs = []

    for user in SallasanaUser.objects.all():
        if not user == request.user:

            user_view = UserView(user, request.user).to_dict()

            if GENDER[user_view['gender']] == request.user.interest_gender:
                #recs.append(user_view)
                recs.append(user.fb_profile.__dict__)

    response = {'recs': recs}

    #user = request.user
    return render_json(response)


# SETTINGS