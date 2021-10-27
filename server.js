/**
 * Entry point for the web application
 */
const express = require('express');
const dbConnect = require('./config/database.connect.js')
const route = require('./app/routes/note.routes.js');
const routeUser = require('./app/routes/user.route.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/notes', route)
app.use('/users', routeUser)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    dbConnect();
});
