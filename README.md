--------------API ASSIGNMENT-------------

Created a dashboard that displays stored essays along with add delete and edit functionalities
dashboard at localhost:3000

Also created API's that can be used by external users ( ALL API tests are done using PostmanCanary )

- localhost:3000/ess/         :    to display all the essays (GET request)
- localhost:3000/ess/:essid   :    replace essid with id number to find essay by id (GET request)
- localhost:3000/ess          :    use POST request to send data in JSON format. Enter essay id to update and enter 0  to create new essay
- localhost:3000/ess/:essid   :    send DELETE request with essay id to delete essay

SQL DATABASE :

- used mysql Server 8.0 to create local server
- SQL database was created using mysql workbench
- table contains colums for essid, title, author, description

This assignment was created using nodejs, express js, ejs, mysql, body-parser, nodemon.

The routes folder contains ess.js file which has all the API's.

The views folder contains the ejs files for the dashboard.

The connection.js file hosts all the credentials to connect to local DB server and is used by Server.js file to connect to the DB.
