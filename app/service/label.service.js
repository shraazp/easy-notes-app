const {
    createLabel,
    findAllLabels,
    findLabel,
    updateLabel,
    deleteById
} = require('../models/label.model')

const createNewLabel = (labelName) => {
    return createLabel(labelName)
}

const getAllLabels = () => {
    return findAllLabels()
}

const getLabel = (findId) => {
    return findLabel(findId)
}

const updateLabels = (findId, labelName) => {
    return updateLabel(findId, labelName)
}

const deleteLabel = (findId) => {
    return deleteById(findId)
}

module.exports = {
    createNewLabel,
    getAllLabels,
    getLabel,
    updateLabels,
    deleteLabel
}
