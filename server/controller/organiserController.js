const organiserModel = require('../model/organiserModel');

const getOrganiserDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const events = await organiserModel.getOrganiserDetails(id)
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in getAllEvents:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const fetchOrganizers = async (req, res) => {    
    try {
        const events = await organiserModel.fetchOrganizers();
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in getAllEvents:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getOrganiserDetails, fetchOrganizers };