// Tommy
const router = require('express').Router();
const MyEventController = require('../controllers/MyEventController');
const middlewareUser = require('./middlewareUser');
// Protected routes, sikrer at du må være logget inn for å sende requests til disse endpoints. I tillegg sender isLoggedIn funksjonen med seg ID fra JWT så man sikrer at du kun får se gruppene du selv er med i. 
router.get('/:id', middlewareUser.isLoggedIn, MyEventController.getMyEvent);
router.get('', middlewareUser.isLoggedIn, MyEventController.getMyEvents);
module.exports = router;

