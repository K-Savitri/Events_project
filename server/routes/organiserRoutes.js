const express = require('express');

const organiserController = require('../controller/organiserController');
// const { verifyToken } = require('../utils/authMiddleware');
const router = express.Router();

router.get('/organizer/:id', organiserController.getOrganiserDetails); 

router.get('/organizers', organiserController.fetchOrganizers);

module.exports = router;