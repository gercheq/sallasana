__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns(
    '',
    url(r'^home/$', 'app.views.home', name='home'),
    url(r'^login/$', 'app.views.login', name='login'),
    url(r'^logout/$', 'app.views.logout', name='logout'),
    url(r'^$', 'app.views.index', name='index'),
)
