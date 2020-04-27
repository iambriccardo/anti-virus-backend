# #EUvsVirus
This project was developed for the #EUvsVirus Hackathon organized by the European Union. It was one of the biggest hackathons to date with 20k+ partecipants.

## Our project

To learn more about our post go on [devpost](https://devpost.com/software/antivirus).

## Technologies involved

This repository contains the back-end of our project which was developed with the following technologies:
* NodeJS
* GraphQL
* Apollo GraphQL
* Heroku
* PostegreSQL

## How to run it

In order to run the backend type the command ``node app.js`` in the root folder.  

*Please note that the application must have the following environment variables set*:
1. ``DATABASE_URL`` contains the url of the database on which the backend is connecting to.
2. ``PORT`` contains the port on which the backend will listen for incoming requests and it is defaulted to ``4000``.