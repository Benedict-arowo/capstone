from .models import Entry, Folder, Note, Card, Uri
from django.forms import ModelForm, Textarea, PasswordInput, URLInput, TextInput


class EntryForm(ModelForm):
    class Meta:
        model= Entry
        fields = ('title', 'username', 'password', 'note', 'folder', 'protected', 'favorite',)
        widgets = {
            'password': PasswordInput(render_value=True),
            'note': Textarea(attrs={'rows':6, 'placeholder':"Add notes here..."}),
        }

class UriForm(ModelForm):
    class Meta:
        model = Uri
        fields = ('uri',)
        widgets = {
            'uri': TextInput(attrs={'placeholder': "url..."})
        }


class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = ('title', 'text', 'folder', 'protected', 'favorite',)
        widgets = {
            'text' : Textarea(attrs={'rows':6, 'placeholder': 'Add your note here...'})
        }


class CardForm(ModelForm):
    class Meta:
        model = Card
        fields = ('title', 'value', 'pin', 'notes', 'favorite','folder',)
        widgets = {
            'value': Textarea(attrs={'placeholder':"Number/Code"}),
            'pin': PasswordInput(attrs={'placeholder': "PIN/Passcode"})
        }

# started as colorfield external module, but maybe can use html type=color selector in a charfield
class NewFolder(ModelForm):
    class Meta:
        model = Folder
        fields = ('name', 'color',)
        widgets = {
            'color': Textarea(attrs={'type':"color"})
        }