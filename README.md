## Project Objective

Build an app that lets users view movies in a gallery, then click to see additional details of that movie.
Also let users add a movie to the gallery when the database design is broken up into multiple tables, requiring multiple query injections on submit.

## Features

The user can:

-   View all their movies
-   Look at details of any movie
-   Add a new movie to the gallery

## What I Learned

-   Use URL params to persist state
-   Looping multiple queries in a database using Promise.all
-   Nesting queries to achieve asynchronous sql injections

## How To Run The Project

-   Database name: `saga_movies_weekend`
-   Data in: `database.sql`
-   Run `npm install`
-   Run `npm run server`
-   Run `npm run client`

![Screenshot](AppScreenshot.png)
