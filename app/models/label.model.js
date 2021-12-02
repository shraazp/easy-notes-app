const mongoose = require('mongoose');
require("dotenv").config();
const LabelSchema = mongoose.Schema({
    labelName: {
        type: String,
        required: true
    }
}, {timestamps: true});
const Label = mongoose.model('Label', LabelSchema);

const createLabel = (labelName) => {
    const label = new Label({labelName: labelName})
    return label.save()
}

const findAllLabels = () => {
    return Label.find()
}

const findLabel = (findId) => {
    return Label.findById(findId)
}

const updateLabel = (findId, labelName) => {
    return Label.findByIdAndUpdate(findId, {
        labelName:labelName
    })
};

const deleteById = (findId) => {
    return Label.findByIdAndRemove(findId)
}

module.exports={
    createLabel,
    findAllLabels,
    findLabel,
    updateLabel,
    deleteById
}