// Tommy
const router = require('express').Router();
const AttendeeController = require('../controllers/AttendeeController');
const middlewareUser = require('./middlewareUser');
// Protected routes, sikrer at du må være logget inn for å sende requests til disse endpoints. I tillegg sender isLoggedIn funksjonen med seg ID fra JWT så man sikrer at du kun får se gruppene du selv er med i. 
router.get('/:id', middlewareUser.isLoggedIn, AttendeeController.getAttendees);
router.post('/create', middlewareUser.isLoggedIn, AttendeeController.postJoinEvent);
//router.delete('', middlewareUser.isLoggedIn, AttendeeController.delete);
module.exports = router;