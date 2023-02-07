const express = require('express');
const placesController = require('../controllers/placesController');
const {
  validateCreatePlace,
  validateUpdatePlace
} = require('../validatiors/validatePlace');
const fileUpload = require('../middleware/fileUpload');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  validateCreatePlace,
  placesController.createPlace
);

router.patch('/:pid', validateUpdatePlace, placesController.updatePlace);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
