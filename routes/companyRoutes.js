const express = require('express');
const companyControllers = require('../controllers/companyControllers');

const router = express.Router();


router.get('/', companyControllers.getHome);
router.get('/signup', companyControllers.getSignup);    
router.post('/signup', companyControllers.signupCompany);



module.exports = router;
