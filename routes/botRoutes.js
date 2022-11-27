const router = require('express').Router();
const botController = require('../controllers/botController');




router.post('/read/email', botController.getEmails)



module.exports = router