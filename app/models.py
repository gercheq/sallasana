from mongoengine import *
import datetime

from django.db import models

# Create your models here.

class UserProfile(Document):
    time_created = DateTimeField(default=datetime.datetime.now)
    time_updated = DateTimeField(default=datetime.datetime.now)
    time_deleted = DateTimeField(default=None)
