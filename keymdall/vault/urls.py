from django.urls import path
from . import views

app_name = 'vault'

urlpatterns = [
    path("", views.index, name="index"),
    path("new_element", views.new_element, name="new_element"),
    path("login_vault", views.logins_vault, name="logins_vault"),
    # path("edit_login/<int:id>", views.edit_login, name="edit_login"),
    path("userpage", views.userpage, name="userpage"),
    path("register", views.register, name="register"),
    path("login", views.login_page, name="login"),
    path("logout", views.logout_user, name="logout"),
]