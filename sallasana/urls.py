from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from django.conf import settings
from django.conf.urls.static import static

PATH = getattr(settings, 'URL_PATH', '')

urlpatterns = patterns('',
    url(r'^$', 'app.views.home', name='index'),
    url(r'^api/fb_user/(?P<username>.*)$', 'api.views.get_fb_user_view', name='get_fb_user_view'),
    url(r'^jqm$', 'app.views.home_jqm', name='home_jqm'),
    # url(r'^sallasana/', include('sallasana.foo.urls')),

    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^home/$', 'app.views.home', name='home'),

    url('', include('social.apps.django_app.urls', namespace='social')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
