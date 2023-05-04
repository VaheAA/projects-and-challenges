const { check } = require('express-validator');

exports.validateCreatePlace = [
  check('title').not().isEmpty(),
  check('description').isLength({ min: 5 }),
  check('address').not().isEmpty()
];

exports.validateUpdatePlace = [
  check('title').not().isEmpty(),
  check('description').isLength({ min: 5 })
];
