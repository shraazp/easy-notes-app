const express = require('express');
const dbConnect = require('./config/database.connect.js')
const route = require('./app/routes/note.routes.js');
const routeUser = require('./app/routes/user.route.js');
const logger = require('./utils/logger');
// create express app
const app = express();
// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/notes', route)
app.use('/users', routeUser)
var flash = require('express-flash');
app.use(flash());
// Connecting to the database
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    dbConnect();
});
