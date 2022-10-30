from http.client import HTTPResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse

from django import forms
from django.forms import ModelForm

import json

# from .models import .....

# Create your views here.

def index(request):
    return render(request, 'vault/index.html')


def login_view(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
        else:
            return render(request, 'vault/login.html', {"message": "Invalid username and/or password."})

    return render(request, 'vault/login.html')

def register(request):
    """ no body or template only js toggle in login view"""
    pass

#TODO add login_required
def userpage(request):
    return render(request, 'vault/userpage.html')

def logout(request):
    logout(request)
    """add logout funct to log user out and reroute to index page """

    return HttpResponseRedirect(reverse('vault:index'))