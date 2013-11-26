from app.models import FBProfile

import json
from bson import json_util

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from common.utils import render_json


#@login_required
#def get_fb_user_view(request, query=None):
#
#    response = []
#
#    # Returns All Users
#    if not query:
#        fb_users = get_fb_user()
#        if fb_users:
#            for fb_user in fb_users:
#                fb_user_clean = {}
#                for field in fb_user._fields_ordered:
#                    fb_user_clean[field] = fb_user[field]
#
#                response.append(fb_user_clean)
#
#    # Returns Specific User
#    else:
#        fb_user = get_fb_user(query)[0]
#        if fb_user:
#            fb_user_clean = {}
#            for field in fb_user._fields_ordered:
#                fb_user_clean[field] = fb_user[field]
#
#            response.append(fb_user_clean)
#
#    return render_json(response[:5])


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
    response = {}
    return render_json(response)