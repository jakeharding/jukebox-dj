# Term project for CSCI 4850
Master branch:

[![Build Status](https://travis-ci.org/jakeharding/jukebox-dj.svg?branch=master)](https://travis-ci.org/jakeharding/jukebox-dj)
[![Coverage Status](https://coveralls.io/repos/github/jakeharding/jukebox-dj/badge.svg?branch=master)](https://coveralls.io/github/jakeharding/jukebox-dj?branch=master)

Dev branch:

[![Build Status](https://travis-ci.org/jakeharding/jukebox-dj.svg?branch=dev)](https://travis-ci.org/jakeharding/jukebox-dj)
[![Coverage Status](https://coveralls.io/repos/github/jakeharding/jukebox-dj/badge.svg?branch=dev)](https://coveralls.io/github/jakeharding/jukebox-dj?branch=dev)


This repo contains the source code for the term project of CSCI 4850. Please see the [contributing](https://github.com/jakeharding/jukebox-dj/blob/master/CONTRIBUTING.md) document for contribution guidelines.

The following instructions outline how to setup the application for development, leaving out anything platform dependent.
This will provide a lightweight web and websocket server for a proof of concept.  More robust servers will be needed for a production instance. 
It is assumed you have cloned the repo and are in the project root directory.

## Frontend

The frontend is build with the Ionic framework and served by Django as a static application so it must be built first.
Since the frontend is a static application and is served by Django, the `ionic serve` won't work.
Node and Ionic CLI will need to be installed.  Installing Node is platform dependent. After Node is installed, Ionic can be installed by running:
`npm install -g ionic@latest`.

To build the frontend run the following from the command line:
- `cd jukebox_dj/index/static/jukebox-dj/`
- `npm run prepare` Say yes to any prompt asking to install dependencies.
- `npm run build` Will build the app.
- `npm run watch` Will watch files and rebuild the app on any changes.


## Backend

The backend consists of a Django web application.  
A virtualenv using Python 3.6 is recommended in order to isolate Python dependencies.
PostgreSQL is used for a database system. Database settings will need to configured in a local_settings.py file, and
the postgres service will need to be running.
An example local settings file is at jukebox_dj/local_settings.py.example.
Installing Python and any database system is platform dependent.

A Redis server is necessary to run the application.
Make sure that your Redis server is running on port 6379.
Installing Redis is platform dependent.

To install Python dependencies run `pip install -r requirements.txt`.
After Python requirements are installed and the database is created, migration will need to be ran to create tables in the database.
To run the migrations run `python manage.py migrate`.
To run the Django development server run `python manage.py runserver`.

Open a browser to `http://localhost:8000`.

