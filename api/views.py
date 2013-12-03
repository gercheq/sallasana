__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from app.models import FBProfile

import json
from bson import json_util

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from common.utils import render_json


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


# SETTINGS