const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.authenticate);
router.get('/profile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/addCategory',ctrlUser.addCategory);
router.get('/getCategoryList',ctrlUser.getCategoryList);
module.exports = router;



