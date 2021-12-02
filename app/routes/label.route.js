const express = require('express')
const routerLabel = express.Router() // middleware creates route handler
const labels=require('../controllers/label/label.controller')
// Create a new label
routerLabel.post('/', labels.create);
// Retrieve all labels
routerLabel.get('/', labels.getLabels);
// Retrieve a singlelabel
routerLabel.get('/:labelId',labels.findLabel);
// Update a label
routerLabel.put('/:labelId', labels.update);
// Delete a label
routerLabel.delete('/:labelId', labels.delete);

module.exports = routerLabel