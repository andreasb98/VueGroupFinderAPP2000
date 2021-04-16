// Tommy
const router = require('express').Router();
const EventController = require('../controllers/EventController');
const middlewareUser = require('./middlewareUser');
// Protected routes, sikrer at du må være logget inn for å sende requests til disse endpoints. I tillegg sender isLoggedIn funksjonen med seg ID fra JWT så man sikrer at du kun får se gruppene du selv er med i.
router.post('/create', middlewareUser.isLoggedIn, EventController.postRegisterEvent);
router.get('/:id', middlewareUser.isLoggedIn, EventController.getEvent);
router.get('', middlewareUser.isLoggedIn, EventController.getEvents);
module.exports = router;

