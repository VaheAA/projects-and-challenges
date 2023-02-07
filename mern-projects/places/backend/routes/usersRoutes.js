const express = require('express');
const usersController = require('../controllers/usersController');
const { validateSignup } = require('../validatiors/validateUsers');
const fileUpload = require('../middleware/fileUpload');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  validateSignup,
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
