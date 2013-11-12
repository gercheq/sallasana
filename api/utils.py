import json

from bson import json_util
from core import get_fb_user


def get_recommendations(user=None):
    """
    Get a list of recommendedations for a specific user.

    For now it returns all the users but we'll be filtering
    recommendation per user pretty soon.
    """
    recommendations = []

    fb_users = get_fb_user()
    if fb_users:
        for fb_user in fb_users:
            fb_user_clean = {}
            for field in fb_user._fields_ordered:
                fb_user_clean[field] = fb_user[field]

            #fb_user_clean["photo"] = "https://graph.facebook.com/" + fb_user.username + "/picture?width=200&height=200"

            recommendations.append(fb_user_clean)

    # Limit the total number of recommendations to 20 to decrease used memory
    return json.dumps(recommendations[:20], default=json_util.default)
