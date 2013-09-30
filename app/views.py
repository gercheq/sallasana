from django.http import Http404
from django.shortcuts import render_to_response

from django.contrib.auth.decorators import login_required
from django.template import RequestContext


def login(request):
    return render_to_response('login.html', {'user': request.user},
                              RequestContext(request))

@login_required
def home(request):
    return render_to_response('home.html', {'user': request.user},
                              RequestContext(request))
