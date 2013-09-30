from mongoengine import *
import datetime


class FBUser(DynamicDocument):
    fb_id = StringField(required=True, primary_key=True, unique=True)
    username = StringField()
    #email = EmailField()

    friends = DynamicField()

    is_generated_user = BooleanField(default=False)

    time_created = DateTimeField(default=datetime.datetime.now)
    time_updated = DateTimeField(default=datetime.datetime.now)
    time_deleted = DateTimeField(default=None)

    meta = {
        'indexes': ['email', 'fb_id', 'username']
    }

#class User(Document):
#    email = EmailField(required=True)
#    fb_uid = StringField(required=True)
#
#    first_name = StringField()
#    last_name = StringField()
#
#    fb_friends = ListField(field=FBUser)
#
#    time_created = DateTimeField(default=datetime.datetime.now)
#    time_updated = DateTimeField(default=datetime.datetime.now)
#    time_deleted = DateTimeField(default=None)
#
#    meta = {
#        'indexes': ['email', 'fb_uid']
#    }


