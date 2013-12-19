__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

from django.http import Http404
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from django.template import RequestContext

from sallasana.app.facades import RecommendationsView


def login(request):
    return render_to_response('welcome.html', {'user': request.user}, RequestContext(request))

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')

@login_required()
def index(request):
    return render_to_response('welcome.html', RequestContext(request))


@login_required()
def home(request, template_name="home.html"):


    if request.user.is_anonymous():
        return redirect('welcome')

    user = request.user
    recommendations = RecommendationsView(user.get_recommendations()).to_dict()

    data = {
        'user': request.user.to_dict(),
        'recommendations': recommendations
    }

    return render(request, template_name, data)
