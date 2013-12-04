__author__ = 'Renan Cakirerk <renan@cakirerk.org>'


class LikeView(object):
    def __init__(self, like):
        self.like = like

    def to_dict(self):
        try:
            cover = self.like['cover']['source']

        except AttributeError:
            cover = None

        obj = {
            'name': self.like.get('name'),
            'cover': cover
        }

        return obj


class UserView(object):
    def __init__(self, user, user2):
        self.user = user
        self.user2 = user2

    def to_dict(self):
        # Some profiles might not have a gender
        # defaulting to female for populating more
        # women in the database
        gender = self.user.fb_profile.gender
        if not gender:
            gender = 'female'

        obj = {
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'avatar': self.user.fb_profile.avatar,
            'photos': [],
            'common_friends': self.user.fb_profile.common_friends(self.user2),
            'common_likes': self.user.fb_profile.common_likes(self.user2),
            'gender': self.user.fb_profile.gender
        }

        return obj