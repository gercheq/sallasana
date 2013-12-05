__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns(
    'sallasana.api.views',
    url(r'^like/(?P<user_id>\d+)$', 'like'),
    url(r'^dislike/(?P<user_id>\d+)$', 'dislike'),
    url(r'^match$', 'match'),
    url(r'^ping$', 'ping'),
    url(r'^recs$', 'recommendations')
)