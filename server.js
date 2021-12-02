/**
 * Entry point for the web application
 */
 
const express = require('express');
const dbConnect = require('./config/database.connect.js')
const route = require('./app/routes/note.routes.js');
const routeUser = require('./app/routes/user.route.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//var cors = require('cors')
const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const cors = require('cors');
const routerLabel = require('./app/routes/label.route.js');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/notes', route)
app.use('/users', routeUser)
app.use('/labels',routerLabel)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/images', express.static('app/public'))
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
    dbConnect();
});
