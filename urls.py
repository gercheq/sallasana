from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^api/', include('api.urls')),
    url('', include('app.urls')),

    url('', include('social.apps.django_app.urls', namespace='social')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
