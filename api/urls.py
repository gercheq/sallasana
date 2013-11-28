__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns(
    'sallasana.api.views',
    url(r'^like', 'like'),
    url(r'^dislike', 'dislike'),
    url(r'^match', 'match'),
    url(r'^ping', 'ping'),
    url(r'^recs', 'recommendations')
)