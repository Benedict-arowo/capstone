
## TO Do:

~~1. build registration and login page into one with toggle between views.~~
2. Add logic to registration, adding instances of user in db after successful registration

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





## notes:
* it seems like they just load everything on first request, since there is no further fetching between sections and elements, just PUT and DELETE requests on some update actions
* not even opening an element fetches further datas.
    *upon inspection it really seems like on loading we get sent a json response fo 23.000 lines (after formatting)



### attributions
* if shield icon = <a href="https://www.flaticon.com/free-icons/shield" title="shield icons">Shield icons created by Freepik - Flaticon</a>