# NFL Rushing Stats

A small project to display NFL players rushing statistics. Users can view, sort
and search all information available through the JSON object stored in the backend
application.

## Installation

### Technologies

Ensure NodeJS is installed on your machine (Tested with versions >= 8.16.0).

### Frontend

1. Change directory into the `frontend` folder
2. Run `npm install`
3. Run `npm start`, the application will [open in your browser](http://localhost:3000).
4. *Optional* Run `npm test` to launch the Jest test runner

### Backend

1. Change directory into the `backend` folder
2. Run `npm install`
3. Run `npm start`. The application will be running on port 8000
4. *Optional* Run `npm test` to launch the Jest test runner

## Features

### Dashboard

When the application first loads you will be placed on the dashboard screen. Here
you will see a data table with a variety of different controls.

#### Search

The search field can be useful for finding records in which you already know some
information you'd like to look for. The table is indexed on the six fields seen
in the browser, so feel free to search for a player's name, team, position,
total rushing yards, longest rush, or total rushing touchdowns.

This feature makes an api request to the backend process which will run the search
query using a package called [Fuse.js](https://fusejs.io/). The input field uses
a custom React hook that will debounce the users input, meaning it will wait until
0.75s after they have finished typing to make an api request.

#### Entries Showing

This is a dropdown field that allows users to expand or shrink the number of
records that are being viewed in their browser. This also makes an api request in
order to gather additional or fewer records.

#### Pagination

Underneath the data table you will find two buttons that allow users to move to
next or previous page of records. Similar to search and entries showing, this makes
and api request to gather the records to be viewed for a particular page.

#### Column Sorting

The three data columns that aren't the players name can be sorting either ascending
or descending. Click the column header to active this feature on a particular column.

#### Download CSV

Once you've finished manipulating the data within the table in the browser, feel
free to export your results into a CSV file for easy manipulation in other programs
such as Microsoft Excel.

#### Table Links

The final feature this page has to offer is the ability to click on a player's
record to see a full list of their statistics. This is displayed in a separate page
outlined below.

### Player Stats

This is a simple page which displays the full list of statistics on a player.
You can click the page header to return to the dashboard.
