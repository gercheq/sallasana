from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()


# Necessary for serving static files
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = patterns('',
    url(r'^$', 'app.views.home', name='home'),
    url(r'^api/user/(?P<uid>\w+)$', 'api.views.get_user', name='get_user'),
    # url(r'^sallasana/', include('sallasana.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
