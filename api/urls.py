from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns(
    '',
    url(r'^fb/user/(?P<query>.*)$', 'api.views.get_fb_user_view', name='get_fb_user_view')
)