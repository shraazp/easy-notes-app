const dbConfig = require('./database.config');
const mongoose = require('mongoose');
const dbConnect = () => {
    mongoose.connect(dbConfig.url, {useNewUrlParser: true}).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}
module.exports = dbConnect
