const {
    createNewLabel,
    getAllLabels,
    getLabel,
    updateLabels,
    deleteLabel
} = require('../../service/label.service')
const logger = require('../../../utils/logger.js')

exports.create = async (req, res) => {
    try {
        const data = await createNewLabel(req.body.labelName);
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
}

exports.getLabels = async (req, res) => {
    try {
        const data = await getAllLabels();
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
}

exports.findLabel = async (req, res) => {
    try {
        const data = await getLabel(req.params.labelId);
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
}



exports.update = async (req, res) => {
    try {
        const data = await updateLabels(req.params.labelId,req.body.labelName);
        return res.send(data)
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const data = await deleteLabel(req.params.labelId);
        return res.send({message: "label deleted successfully!"})
    } catch (err) {
        logger.error(err)
        return res.send(err)
    }
}