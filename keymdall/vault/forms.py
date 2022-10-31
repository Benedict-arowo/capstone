from .models import Entry, Note, Card, History, Uri, User
from django.forms import ModelForm, Textarea, PasswordInput, URLInput


class EntryForm(ModelForm):
    class Meta:
        model= Entry
        fields = ('title', 'username', 'password', 'note', 'folder', 'protected', 'favorite',)
        widgets = {
            'password': PasswordInput,
            'note': Textarea(attrs={'rows':6, 'placeholder':"Add notes here..."}),

        }

class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = ('title', 'text', 'folder', 'protected', 'favorite',)
        widgets = {
            'text' : Textarea(attrs={'rows':6, 'placeholder': 'Add your note here...'})
        }

class UriForm(ModelForm):
    class Meta:
        model = Uri
        fields = ('uri',)
        widgets = {
            'uri': URLInput(attrs={'placeholder': "url..."})
        }