from http.client import HTTPResponse
from sqlite3 import IntegrityError
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse, reverse_lazy

from .models import Entry, Note, Card, History, User
from .forms import EntryForm, UriForm, NoteForm, CardForm

import json





# Create your views here.
@login_required(login_url=reverse_lazy('vault:login'), redirect_field_name=None)
def index(request):
    entry_form = EntryForm()
    uri_field = UriForm()

    user_logins= Entry.objects.filter(owner=request.user).order_by('-id')

    context = {'entry_form': entry_form, 'uri_field': uri_field, 'all_logins':user_logins }

    return render(request, 'vault/index.html', context=context)

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

def new_element(request):
    if request.method == "POST":
        new_element = EntryForm(request.POST)
        try:
            uri = UriForm(request.POST)
            if uri.is_valid():
                print(uri)
        except:
            uri = ""

        if new_element.is_valid():
            new_element.instance.owner = request.user
            new_element.save()
        return HttpResponseRedirect(reverse('vault:index'))




    else:
        return JsonResponse({'error':"Only POST requests are accepted"})

@login_required(login_url=reverse_lazy('vault:login'), redirect_field_name=None)
def userpage(request):
    return render(request, 'vault/userpage.html')

def logout_view(request):
    logout(request)
    """add logout funct to log user out and reroute to index page """

    return HttpResponseRedirect(reverse('vault:index'))