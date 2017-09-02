# Term project for CSCI 4850

This repo contains the source code for the term project of CSCI 4850. Please see the [contributing](https://github.com/jakeharding/jukebox-dj/blob/master/CONTRIBUTING.md) document for contribution guidelines.

The following instructions outline how to setup the application for development, leaving out anything platform specific.
It is assumed you have cloned the repo and are in the project root directory.

## Frontend

The frontend is build with the Ionic framework and is served by Django as a static application so it must be built first.
Node and Ionic CLI will need to be installed.  Installing Node is platform dependent. After Node is installed, Ionic can be installed by running:
`npm install -g ionic@latest`.

To build the frontend run the following from the command line:
- `cd index/static/jukebox-dj/`
- `npm run prepare` Say yes to any prompt asking to install dependencies.
- `npm run build` Will build the app.
- `npm run watch` Will watch files and rebuild the app on any changes.


## Backend

The backend consists of a Django web application.  
A virtualenv using Python 3.6 is recommended in order to isolate Python dependencies.
Installing 

To install Python dependencies run `pip install -r requirements.txt`.
To run the Django development server run `python manage.py runserver`.

Open a browser to `http://localhost:8000`.

