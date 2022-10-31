from django.urls import path
from . import views

app_name = 'vault'

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("new_element", views.new_element, name="new_element"),
    path("register", views.register, name="register"),
    path("userpage", views.userpage, name="userpage"),
]