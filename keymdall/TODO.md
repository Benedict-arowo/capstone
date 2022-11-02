
## TO Do:

~~1. build registration and login page into one with toggle between views.~~
~~ 2. Add logic to registration, adding instances of user in db after successful registration~~
4. "add notes", "add cards" forms into view
3. "add folder" form to view

<br>

## log
* [30/10]
    * Created the base of the project, started new django project from zero, linked the views, the settings, the urls from the main project to the vault app
    * added temporary icon
    * *added user snippets in vscode for django templates*
    * added templates with navbar links with conditional for logged in users
    * created the register route with a button that switches the login form to registration asyncronous to avoid refresh and additional templates.
    * added layout inheritance and stylesheet and script files in static

    ...later at night
    * added three section
        * side panel
        * vault content
        * element display
    * added buttons for switching view and considering various implementation

* [31/10]
    * added some styling to index to visually see the blocks layout
    * created the models
    *  changed some models
    * created the forms
    * canged dosplay
    * mad a view route to save the entry handeld by django
    * added comments
        <!-- òast thing, i was loosin focus -->
    * added async reuest to GET requests to get back list of saved access
    * added proprerties to models

* [01/11]
    * added initial value to URI so that http:// already present,



## notes:
* it seems like they just load everything on first request, since there is no further fetching between sections and elements, just PUT and DELETE requests on some update actions
* not even opening an element fetches further datas.
    *upon inspection it really seems like on loading we get sent a json response fo 23.000 lines (after formatting)

* PASSWORD to toggle/untoggle view, as I suspected, js change attribute type='password' to type='text'
* ENTRY>URL, many to one relationship, must be another model
* URI decide if just stick to one and be part of the element or as a separate element with second ajax call
* URL change from URLfield to input??

* ~~Should i add jsonresponse to localstorage?? meaning i can query server, save to localstorage the jsonresponse, then treat the rest of the app based on localstorage~~
    * check into websockets

## resources to look at
_Colorfield = https://pypi.org/project/django-colorfield/
_Barcode = https://python.plainenglish.io/generating-barcodes-with-django-52e450fd960b

## Ideas
Il field protected dell'elemento invece che chiedere la master password, chiede un pin diverso 6 cifre
se user appena registrato non ha impostato PIN, tenere header in cima che ricorda di impostare il PIN
altrimenti quando si va per rendere "protected" un item, si viene reindirizzati al prompt di richiedsta PIN (tipo modal) in modo che venga impostato.
    possiblità di mettere "protected" a tutta una cartella, con query (set all items in folder as protected = true)


### attributions
* if shield icon = <a href="https://www.flaticon.com/free-icons/shield" title="shield icons">Shield icons created by Freepik - Flaticon</a>



# REMEMBER ERROR
when fetch request sends back `unexpected '<' from '<DOCTYPE html.... '` problems might be:
    * wrong/typo in url for the fetch request like (`/items/`) instead of (`/items`) [different than the one the urls.py is expecting]
    *