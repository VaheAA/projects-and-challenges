const fs = require('fs');
const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');

const getPlaceById = async (req, res, next) => {
  const { pid } = req.params;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'Could not find place for the provided id',
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const { uid } = req.params;

  let places;
  try {
    places = await Place.find({ creator: uid });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place',
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      'Could not find places for the provided user ',
      404
    );
    return next(error);
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true }))
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );

  const { title, description, address } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path.replace(/\\/g, '/'),
    creator: req.userData.userId
  });

  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newPlace.save({ session: sess });
    user.places.push(newPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({ place: newPlace });
};

const updatePlace = async (req, res, next) => {
  const { pid } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );

  const { title, description } = req.body;

  let place;

  try {
    place = await Place.findById(pid);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find the place',
      500
    );
    return next(error);
  }

  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed edit this place', 401);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place',
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const { pid } = req.params;

  let place;
  try {
    place = await Place.findById(pid).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find place for this id', 404);
    return next(error);
  }

  if (place.creator.id.toString() !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this place',
      403
    );
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: 'Place was deleted' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
