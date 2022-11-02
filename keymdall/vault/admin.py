from django.contrib import admin

from vault.models import *

# Register your models here.

# TODO  remove comments from here for admin console

admin.site.register(User)
admin.site.register(Entry)
admin.site.register(Uri)
admin.site.register(History)
admin.site.register(OtherField)
admin.site.register(Note)
admin.site.register(Card)
admin.site.register(Folder)