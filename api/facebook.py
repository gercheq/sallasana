from django.core.cache import cache


def get_access_token(user):
    key = str(user.id) + '__access_token'
    access_token = cache.get(key)

    # If cache is empty read the database
    if access_token is None:
        social_user = user.social_auth.get()

        if social_user.extra_data:
            access_token = social_user.extra_data.get('access_token')
            expires = social_user.extra_data.get('expires')

            cache.set(key, access_token, int(expires) if expires is not None else 0)

    return access_token


def get_friends(user):
    return None

def get_user_pic(user):
    return None