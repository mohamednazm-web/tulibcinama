const AllPosters = require('../models/postersModel');
const Allviews = require('../models/viewsModel');
const Profile = require('../models/profilesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createNewProfile = catchAsync(async (req, res, next) => {
  const doc = await Profile.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.deleteOneProfile = catchAsync(async (req, res, next) => {
  const doc = await Profile.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: {
      data: null
    }
  });
});
