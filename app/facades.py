__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from app.models import FBLike
from app.models import FBProfile


class CommonLikeView(object):
    def __init__(self, common_like):
        self.common_like = common_like

    def to_dict(self):
        try:
            cover = self.common_like.cover.get('source')

        except AttributeError:
            cover = None

        obj = {
            'l_id': self.common_like.l_id,
            'name': self.common_like.name,
            'cover': cover
        }

        return obj


class CommonFriendView(object):
    def __init__(self, common_friend):
        self.common_friend = common_friend

    def to_dict(self):
        obj = {
            'fb_id': self.common_friend.fb_id,
            'name': self.common_friend.name,
            'avatar': self.common_friend.avatar.get('url')
        }

        return obj


class UserView(object):
    def __init__(self, user, other_user):
        self.user = user
        self.other_user = other_user

    def get_common_likes_view(self, other_user):
        common_likes_ids = self.user.fb_profile.common_likes(other_user)
        common_likes_view = []

        for common_like_id in common_likes_ids:
            common_like = FBLike.objects.get(l_id=common_like_id)
            common_like_view = CommonLikeView(common_like).to_dict()
            common_likes_view.append(common_like_view)

        return common_likes_view

    def get_common_friends_view(self, other_user):
        common_friends_ids = self.user.fb_profile.common_friends(other_user)
        common_friends_view = []

        for common_friend_id in common_friends_ids:
            common_friend = FBProfile.objects.get(fb_id=common_friend_id)
            common_friend_view = CommonFriendView(common_friend).to_dict()
            common_friends_view.append(common_friend_view)

        return common_friends_view

    def to_dict(self):
        # Some profiles might not have a gender
        # defaulting to female for populating more
        # women in the database
        gender = self.user.fb_profile.gender
        if not gender:
            gender = 'female'

        obj = {
            'id': self.user.id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'avatar': self.user.fb_profile.avatar.get('url'),
            'photos': [
                'http://www.readyforce.com/static/images/reboot/generic_user_image.png',
                'http://www.readyforce.com/static/images/reboot/generic_user_image.png',
                'http://www.readyforce.com/static/images/reboot/generic_user_image.png',
                'http://www.readyforce.com/static/images/reboot/generic_user_image.png',
            ],
            'common_friends': self.get_common_friends_view(other_user=self.other_user),
            'common_likes': self.get_common_likes_view(other_user=self.other_user),
            'birthday': self.user.fb_profile.birthday,
            'gender': self.user.fb_profile.gender,
            'like_link': 'http://debug.sallasana.net/api/like/%s' % self.user.id,
            'dislike_link': 'http://debug.sallasana.net/api/dislike/%s' % self.user.id
        }

        return obj