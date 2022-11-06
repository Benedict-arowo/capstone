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


# ===================================================

@login_required(login_url=reverse_lazy('vault:login'), redirect_field_name=None)
def index(request):
    """index displays the forms to add login items
        while inside index js sends ajax request to populate the user vault
    """
    entry_form = EntryForm()
    uri_field = UriForm(initial={'uri': "http://"})
    context = {'entry_form': entry_form, 'uri_field': uri_field}

    return render(request, 'vault/index.html', context=context)

# ===================================================

def new_element(request):
    """
    gets POST request, validates EntryForm and saves adding owner
    gets UriForm, validates and saves, adding the new entry as F.K.
    returns to Index
    """
    if request.method == "POST":
        entry_form = EntryForm(request.POST)

        if entry_form.is_valid():
            # print(f" new elem : {new_element.uri}")
            entry_form.instance.owner = request.user
            new_element = entry_form.save()
            try:
                uri_submission = UriForm(request.POST)
                if uri_submission.is_valid():

                    uri_submission.instance.entry = new_element

                    uri_submission.save()
                    print(uri_submission)
                else:
                    # if no addition after the initial "hhtp://"
                    print("submission not valid")
            # might remove this
            except Exception as e:
                print(e)
                print("blank text")

        return HttpResponseRedirect(reverse('vault:index'))
    else:
        return JsonResponse({'error':"Only POST requests are accepted"})



# ===================================================

def logins_vault(request):
    """ async route to fetch the data with GET and send back the content from user ordered by title"""
    logins = Entry.objects.filter(owner=request.user).order_by('title')

    # TODO change the .serialized to something like .preview in order to have different responses, without sending unused fields
    return JsonResponse([login.serialized for login in logins], safe=False)


# ===================================================
# calls for element to dispaly passing type and ID since there are 3 different types, ID is not deterministic
def get_element(request, type, id):
    # converts back to intereger (used to be converted on client side)
    id = int(id, 16)
    if type == "login":
        element = Entry.objects.get(id=id)
        print(id)
        if element.owner == request.user:
            print("success")
            return JsonResponse(element.serialized, safe=False)
        else:
            print("NO")
    elif type == "note":
        print("note element request")
        pass
    elif type == "card":
        print("card element request")
        pass
    pass

# ===================================================

@login_required(login_url=reverse_lazy('vault:login'), redirect_field_name=None)
def userpage(request):
    """see user dashboard and management"""
    return render(request, 'vault/userpage.html')

# =========== login/logout/register ==========
def login_page(request):
    """same as other cs50, login gets routed to when user is anonymous"""
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

def logout_user(request):
    logout(request)
    """add logout funct to log user out and reroute to index page """
    return HttpResponseRedirect(reverse('vault:index'))


def edit_form(request):
    form = EntryForm()
    return HttpResponse(form)