import collections
import json
import re
import time

from datetime import datetime

from django.conf import settings
from django.db.models.query import QuerySet
from django.db.models.query import ValuesListQuerySet
from django.db.models import Model
from django.http import HttpResponse


def render_json(data, request=None, **kwargs):
    """
    Renders a JSON response.

    Data must be a dict since JSON RPC calls should always return an
    object. See: http://flask.pocoo.org/docs/security/#json-security

    Set RENDER_JSON_PRETTY to True in your settings_local.py to
    pretty-print the JSON response.

    If your RPC needs to support cross-domain requests via JSONP, pass
    request=request into the args.
    """
    # http://stackoverflow.com/questions/1277881
    assert isinstance(data, collections.Mapping), \
        'Argument `data` must be a dict-like object'

    httpresponse_kwargs = {
        'content_type': kwargs.pop('content_type', 'application/json'),
        'status': kwargs.pop('status', None),
    }

    options = {'default': nice_handler}
    if settings.RENDER_JSON_PRETTY:
        options['sort_keys'] = True
        options['indent'] = 4
    content = json.dumps(data, **options)

    # Support JSONP.
    if request and 'callback' in request.GET:
        fname = request.GET['callback']
        fname = re.sub(r'\W', '', fname)
        content = '%s(%s);' % (fname, content)

    # Newline helps when testing with curl on the command line.
    content = content + '\n'

    return HttpResponse(content, **httpresponse_kwargs)


def nice_handler(obj):
    """
    A json handler which tries to be nice by converting non-serializable objects to
    serializable objects.

    Usage:
    json.dumps(thing_to_dump, default=nice_handler)
    """
    primative = primativize(obj)
    if primative != obj:
        return primative
    try:
        return str(obj)
    except:
        return repr(obj)


def primativize(obj):
    """
    try to convert object to json serializable primative type
    """
    if isinstance(obj, datetime):
        return time.mktime(obj.timetuple())
    # http://stackoverflow.com/questions/455580
    if getattr(obj, 'isoformat', None):
        return obj.isoformat()
    if isinstance(obj, ValuesListQuerySet):
        return list(obj)
    if isinstance(obj, QuerySet):
        return [ i.pk for i in obj ]
    if isinstance(obj, Model):
        return obj.pk
    if isinstance(obj, set):
        return list(obj)

    return obj
