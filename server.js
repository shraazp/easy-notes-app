const express = require('express');
const dbConnect = require('./config/database.connect.js')
const route = require('./app/routes/note.routes.js');
const routeUser = require('./app/routes/user.route.js');
const logger = require('./utils/logger');
const routerUser = require('./app/routes/user.route.js');
// create express app
const app = express();
// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/notes', route)
app.use('/users', routeUser)
// Connecting to the database

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    dbConnect();
});
