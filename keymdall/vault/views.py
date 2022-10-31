from http.client import HTTPResponse
from sqlite3 import IntegrityError
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse

from django import forms
from django.forms import ModelForm

from vault.models import User, Entry
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
            return HttpResponseRedirect(reverse('vault:index'))
        else:
            return render(request, 'vault/login.html', {"message": "Invalid username and/or password."})

    return render(request, 'vault/login.html')

def register(request):
    """ no body or template only js toggle in login view"""
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, 'vault/login.html', {"message":"Passwords MUST match"})

        try:
            user= User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, 'vault/login.html', {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse('vault:index'))





    pass

#TODO add login_required
def userpage(request):
    return render(request, 'vault/userpage.html')

def logout_view(request):
    logout(request)
    """add logout funct to log user out and reroute to index page """

    return HttpResponseRedirect(reverse('vault:index'))