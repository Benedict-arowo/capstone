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
    password= models.CharField(max_length=80, null=True, blank=True)
    note= models.TextField(max_length=500, null=True, blank=True)
    folder= models.ForeignKey("Folder", on_delete=models.SET_NULL, null=True, related_name="entry_folder") #LATER change name
    protected= models.BooleanField(default=False)
    favorite= models.BooleanField(default=False)
    owner=models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="entries")

    pass

class Uri(models.Model):
    id = models.BigAutoField(primary_key=True)
    uri = models.URLField(null=True, blank=True)
    entry= models.ForeignKey(Entry, on_delete=models.CASCADE, related_name="uri")



class History(models.Model):
    id=models.BigAutoField(primary_key=True)
    old_passw= models.CharField(max_length=80)
    entry= models.ForeignKey(Entry, on_delete=models.CASCADE, related_name="previous_password")

    pass

class OtherField(models.Model):
    id= models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80, null=True, blank=True)
    value= models.CharField(max_length=80, null=True, blank=True)
    entry= models.ForeignKey(Entry, on_delete=models.CASCADE, related_name="added_field")

    pass

class Note(models.Model):
    id=models.BigAutoField(primary_key=True)
    title= models.CharField(max_length=80, blank=False, null=False)
    text = models.TextField(max_length=500, blank=True, null=True)
    protected = models.BooleanField(default=False)
    favorite = models.BooleanField(default=False)
    folder= models.ForeignKey("Folder", on_delete=models.SET_NULL, null=True, related_name="notes_folder") #LATER change name
    owner=models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="notes")

    pass


class Card(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80, blank=False, null=False)
    value = models.CharField(max_length=80, null=True, blank=True)
    # barcode= ???
    notes= models.TextField(max_length=500, null=True, blank=True)
    favorite = models.BooleanField(default=False)
    folder= models.ForeignKey("Folder", on_delete=models.SET_NULL, null=True, related_name="cards_folder") #LATER change name
    owner=models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="cards")

    pass

class Folder(models.Model):
    id=models.BigAutoField(primary_key=True)
    name=models.CharField(max_length=32, blank=False, null=False)
    color= ColorField(default='#0081FF')
    pass