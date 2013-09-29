from mongoengine import *
import datetime

from django.db import models

# Create your models here.

class FBUser(Document):
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    fb_uid = StringField(required=True, primary_key=True)


class User(Document):
    email = StringField(required=True, primary_key=True)
    fb_uid = StringField(required=True)

    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)

    #fb_friends = ListField(ReferenceField('self'))
    fb_friends = ListField(field=FBUser)

    time_created = DateTimeField(default=datetime.datetime.now)
    time_updated = DateTimeField(default=datetime.datetime.now)
    time_deleted = DateTimeField(default=None)


