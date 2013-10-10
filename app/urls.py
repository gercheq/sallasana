from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns(
    '',
    url(r'^jqm/$', 'app.views.home_jqm', name='home_jqm'),
    url(r'^home/$', 'app.views.home', name='home'),
    url(r'^$', 'app.views.index', name='index'),
)