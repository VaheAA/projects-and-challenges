const { check } = require('express-validator');

exports.validateSignup = [
  check('userName').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];
