const express = require('express');

const eventController = require('../controller/eventController');
// const { verifyToken } = require('../utils/authMiddleware');
const router = express.Router();

router.get('/events', eventController.getAllEvents); 
router.get('/event/:id', eventController.getEventDetails); 
router.get('/event/reg/:id/', eventController.getNoReg); 
router.get('/categories', eventController.getCategories);

router.post('/event/:id/share', eventController.increaseShareCounter);

router.post('/event/review', eventController.addReview);

router.post('/event/photo', eventController.addPhoto);
router.post('/event/editphoto', eventController.editPhoto);


module.exports = router;