from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    # MAYBE maybe login with email

    # username = models.CharField(max_length=30)
    # email = models.EmailField(unique=True)
    # USERNAME_FIELD = "email"

    pass

class Entry:

    pass
