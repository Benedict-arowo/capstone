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

@login_required(login_url="/login")
def index(request):

    return HttpResponseRedirect(reverse('index.html'))

def login_view(request):

    return render(request, 'vault/login.html')