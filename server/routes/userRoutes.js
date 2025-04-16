const userController = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.post('/user/', userController.getUserInfo);  
router.post('/user/edit', userController.editUserInfo);

router.post('/user/reg', userController.regEvent); 
router.post('/user/cancel', userController.cancelRegEvent);
router.post('/user/check-reg', userController.checkReg);


router.post('/user/events', userController.getRegEvents);

router.post('/user/reminder', userController.userReminder);


module.exports = router;