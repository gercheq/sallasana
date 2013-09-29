from django.http import Http404
from django.shortcuts import render_to_response


def home(request):
    return render_to_response('index.html')

def home_jqm(request):
    return render_to_response('index-jqm.html')
