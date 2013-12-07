__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from django.http import Http404
from django.contrib.auth import logout as auth_logout
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from django.template import RequestContext


def login(request):
    return render_to_response('login.html', {'user': request.user}, RequestContext(request))

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')

@login_required()
def index(request):
    return render_to_response('landing.html', RequestContext(request))


@login_required()
def home(request):
    return render_to_response('home.html', {'user': request.user}, RequestContext(request))


def home_jqm(request, template_name='index-jqm.html'):
    """
    Initializes application with the data baked already.
    """

    if request.user.is_anonymous():
        return redirect('welcome')

    recommendations = request.user.get_recommendations()

    data = {
        'recommendations': recommendations
    }

    return render(request, template_name, data)




def welcome(request, template_name='welcome.html'):

    data = {
        'is_anonymous': request.user.is_authenticated()
    }

    return render(request, template_name, data)
