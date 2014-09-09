__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

import djcelery
import mongoengine
import os

DEBUG = True
TEMPLATE_DEBUG = DEBUG
SOCIAL_AUTH_RAISE_EXCEPTIONS = DEBUG
FACEBOOK_SOCIAL_AUTH_RAISE_EXCEPTIONS = DEBUG
RAISE_EXCEPTIONS = DEBUG

ADMINS = (
    ('Gercek Karakus', 'gercek.karakus@gmail.com'),
    ('Renan Cakirerk', 'renan@cakirerk.org'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': keys.get('DB_NAME'),
        'USER': keys.get('DB_USER'),
        'PASSWORD': keys.get('DB_PASSWORD'),
        'HOST': keys.get('DB_HOST'),
        'PORT': '',
    }
}

# Dev server settings
#DEV_DOMAIN_PORT = '%s:%d' % (hostname, 10000 + os.geteuid())
#DEV_DOMAIN = '%s.sallasana.net' % getpass.getuser()

ALLOWED_HOSTS = []
TIME_ZONE = 'America/Los_Angeles'
LANGUAGE_CODE = 'en-us'
SITE_ID = 1
USE_I18N = True
USE_L10N = True
USE_TZ = True
MEDIA_ROOT = os.getcwd() + '/media'
MEDIA_URL = '/media/'
STATIC_ROOT = ''
STATIC_URL = '/static/'
STATICFILES_DIRS = ()

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

SECRET_KEY = keys.get('SECRET_KEY')

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

MIDDLEWARE_CLASSES = [
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'social.apps.django_app.middleware.SocialAuthExceptionMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

if not DEBUG:
    MIDDLEWARE_CLASSES.append('django.middleware.cache.FetchFromCacheMiddleware')

ROOT_URLCONF = 'urls'
WSGI_APPLICATION = 'sallasana.wsgi.application'
TEMPLATE_DIRS = os.getcwd() + '/templates'

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'werkzeug_debugger_runserver',
    'djcelery',
    'south',
    'django_extensions',
    'app',
    'social.apps.django_app.default',

)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

RENDER_JSON_PRETTY = True

DEFAULT_CACHE = {
    "BACKEND": "redis_cache.cache.RedisCache",
    "LOCATION": "127.0.0.1:6379:1",
    "OPTIONS": {
        'CLIENT_CLASS': 'redis_cache.client.DefaultClient',
        'PARSER_CLASS': 'redis.connection.HiredisParser'
    }
}

CACHES = {
    "default": DEFAULT_CACHE
}

SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

MONGO_DATABASE_NAME = keys.get('MONGO_DATABASE_NAME')
MONGO_HOST = keys.get('MONGO_HOST')
MONGO_PORT = 27017

MONGO_USERNAME = keys.get('MONGO_USERNAME')
MONGO_PASSWORD = keys.get('MONGO_PASSWORD')

mongoengine.connect(
    MONGO_DATABASE_NAME,
    host=MONGO_HOST,
    port=MONGO_PORT,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.contrib.messages.context_processors.messages',
    'social.apps.django_app.context_processors.backends',
    'social.apps.django_app.context_processors.login_redirect',

)

AUTHENTICATION_BACKENDS = (
    'social.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

AUTH_USER_MODEL = 'app.SallasanaUser'

URL_PATH = ''

LOGIN_URL = '/login/'
LOGIN_ERROR_URL = '/login/'
LOGIN_REDIRECT_URL = '/home/'
LOGOUT_REDIRECT_URL = '/'

SOCIAL_AUTH_USER_MODEL = 'app.SallasanaUser'
SOCIAL_AUTH_STRATEGY = 'social.strategies.django_strategy.DjangoStrategy'
SOCIAL_AUTH_FACEBOOK_KEY = keys.get('SOCIAL_AUTH_FACEBOOK_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET = keys.get('SOCIAL_AUTH_FACEBOOK_SECRET')
SOCIAL_AUTH_FACEBOOK_SCOPE = [
    'email',
    'user_birthday',
    'user_likes',
    'user_photos',
    'user_relationships',
    'read_friendlists',
    'user_about_me',
    'user_interests',
    #'user_relationship_details',
    #'user_hometown',
    #'user_events',

    'friends_photos',
    'friends_about_me',
    'friends_birthday',
    'friends_location',
    'friends_photos',
    'friends_likes',
    #'friends_checkins',
    #'friends_education_history',
    #'friends_events',
    #'friends_games_activity',
    #'friends_groups',
    #'friends_hometown',
    #'friends_interests',
    #'friends_notes',
    #'friends_online_presence',
    #'friends_photo_video_tags',
    #'friends_relationship_details',
    #'friends_relationships',
    #'friends_religion_politics',
    #'friends_status',
    #'friends_subscriptions',
    #'friends_videos',
    #'friends_website',
    #'friends_activities',
    #'friends_work_history',
]

SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
    'app.pipeline.create_update_fb_user',
)

CELERY_IMPORTS = ('api.tasks', )
CELERY_RESULT_BACKEND = 'redis://120.0.0.1:6379/0'
BROKER_URL = "amqp://guest:guest@localhost:5672//"
CELERY_ACKS_LATE = False

CELERY_ALWAYS_EAGER = DEBUG

CELERY_BROADCAST_EXCHANGE = 'celeryctl'
CELERY_BROADCAST_EXCHANGE_TYPE = 'fanout'
CELERY_BROADCAST_QUEUE = 'celeryctl'
CELERY_CREATE_MISSING_QUEUES = True
CELERY_DEFAULT_DELIVERY_MODE = 'persistent'
CELERY_DEFAULT_EXCHANGE_TYPE = 'direct'
CELERY_DEFAULT_RATE_LIMIT = None
CELERY_DISABLE_RATE_LIMITS = False
CELERY_EAGER_PROPAGATES_EXCEPTIONS = True
CELERY_EVENT_SERIALIZER = 'json'
CELERY_IGNORE_RESULT = False
CELERY_MAX_CACHED_RESULTS = 5000
CELERY_MESSAGE_COMPRESSION = 'gzip'
CELERYD_LOG_LEVEL = 'INFO'
CELERY_REDIRECT_STDOUTS_LEVEL = 'WARNING'
CELERY_REDIRECT_STDOUTS = True
CELERY_RESULT_PERSISTENT = False
CELERY_RESULT_SERIALIZER = 'json'
CELERY_SEND_EVENTS = True
CELERY_SEND_TASK_ERROR_EMAILS = True
CELERY_SEND_TASK_SENT_EVENT = True
CELERY_STORE_ERRORS_EVEN_IF_IGNORED = True
CELERY_TASK_PUBLISH_RETRY = False
CELERY_TASK_PUBLISH_RETRY_POLICY = {
    'max_retries': 3,
    'interval_start': 0,
    'interval_step': 0.2,
    'interval_max': 0.2
}
CELERY_TASK_RESULT_EXPIRES = 1209600  # 2 weeks
CELERY_TRACK_STARTED = True
CELERYD_CONCURRENCY = 8
CELERYD_FORCE_EXECV = False
CELERYD_HIJACK_ROOT_LOGGER = False
CELERYD_LOG_COLOR = True
CELERYD_MAX_TASKS_PER_CHILD = None
CELERYD_PREFETCH_MULTIPLIER = 2
CELERYD_STATE_DB = None
CELERYD_TASK_SOFT_TIME_LIMIT = 600  # 10 minutes
CELERYD_TASK_TIME_LIMIT = 1200  # 20 minutes
CELERY_AMQP_TASK_RESULT_EXPIRES = 300

djcelery.setup_loader()
