from colorfield.fields import ColorField
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    # MAYBE maybe login with email

    # username = models.CharField(max_length=30)
    # email = models.EmailField(unique=True)
    # USERNAME_FIELD = "email"

    pass

class Entry(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80, blank=False, null=False)
    username = models.CharField(max_length=80, null=True, blank=True)
    password= models.CharField(null=True, blank=True)
    uri = models.URLField(null=True, blank=True)
    notes= models.TextField(max_length=500, null=True, blank=True)
    folder= models.ForeignKey("Folder", on_delete=models.SET_DEFAULT, default="no_folder", related_name="categorized") #LATER change name
    protected= models.BooleanField(default=False)
    favorite= models.BooleanField(default=False)

    pass

class History(models.Model):
    id=models.BigAutoField(primary_key=True)
    old_passw= models.CharField(max_length=80)
    item= models.ForeignKey(Entry, on_delete=models.CASCADE, related_name="previous_password")

    pass

class OtherField(models.Model):
    id= models.BigAutoField
    title = models.CharField(max_length=50, null=True, blank=True)
    value= models.CharField(null=True, blank=True)
    item= models.ForeignKey(Entry, on_delete=models.CASCADE, related_name="added_field")

    pass

class Note(models.Model):
    id=models.BigAutoField(primary_key=True)
    title= models.CharField(max_length=80, blank=False, null=False)
    text = models.TextField(max_length=500, blank=True, null=True)
    protected = models.BooleanField(default=False)
    favorite = models.BooleanField(default=False)
    folder= models.ForeignKey("Folder", on_delete=models.SET_DEFAULT, default="no_folder", related_name="categorized") #LATER change name

    pass

class Folder(models.Model):
    name=models.CharField(max_length=32, blank=False, null=False)
    color= ColorField(default='#0081FF')
    pass

class Card(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80, blank=False, null=False)
    value = models.CharField(null=True, blank=True)
    # barcode= ???
    notes= models.TextField(max_length=500, null=True, blank=True)
    favorite = models.BooleanField(default=False)
    folder= models.ForeignKey("Folder", on_delete=models.SET_DEFAULT, default="no_folder", related_name="categorized") #LATER change name

    pass