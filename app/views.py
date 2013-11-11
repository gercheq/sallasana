from django.http import Http404
from django.contrib.auth import logout as auth_logout
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.template import RequestContext

from sallasana.api.utils import get_recommendations

def login(request):
    return render_to_response('login.html', {'user': request.user}, RequestContext(request))

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')

@login_required()
def index(request):
    return render_to_response('index.html', RequestContext(request))


@login_required()
def home(request):
    return render_to_response('home.html', {'user': request.user}, RequestContext(request))


def home_jqm(request, template_name='index-jqm.html'):
    """
    Initializes application with the data baked already.
    """
    user = None
    # user = request.user

    data = {
        'recommendations': get_recommendations(user)
    }

    return render(request, template_name, data)
