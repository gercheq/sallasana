from app.models import FBUser
from core import get_fb_user

import json
from bson import json_util

from django.http import HttpResponse




def get_fb_user_view(request, query=None):

    response = []

    # Returns All Users
    if not query:
        fb_users = get_fb_user()
        if fb_users:
            fb_user_clean = {}
            for fb_user in fb_users:
                for field in fb_user._fields_ordered:
                    fb_user_clean[field] = fb_user[field]

                response.append(fb_user_clean)

    # Returns Specific User
    else:
        fb_user = get_fb_user(query)[0]
        if fb_user:
            fb_user_clean = {}
            for field in fb_user._fields_ordered:
                fb_user_clean[field] = fb_user[field]

            response.append(fb_user_clean)

    return HttpResponse(json.dumps(response, default=json_util.default))
