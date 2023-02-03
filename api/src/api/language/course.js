const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const _ = require('lodash');
const { ERR_NO_COURSE_DETAILS } = require('../../utils/constants');
const {
  patchDocument,
  populateExampleData,
} = require('../../utils/languageHelper');
const { deleteFolder } = require('../../utils/aws/s3');
const { getAllCompletedUnits } = require('../../utils/learnerHelper');
const { sendEmail } = require('../../utils/emailing');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Does a patch update a single course in the database, meaning
 * it makes changes to parts of the course specified in the request.
 */
router.patch(
  '/:id',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const updates = req.body;

    const course_id = req.params.id;

    const course = await models.Course.findById(course_id);

    patchDocument(course, updates);

    await course.save();
    return sendResponse(res, 200, 'Successfully updated course', course);
  }),
);

/**
 * Creates a new course in the database
 */
router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const user = req.user;
    const courseData = req.body;
    if (!courseData.details) {
      return sendResponse(res, 404, ERR_NO_COURSE_DETAILS);
    }
    const newCourse = new models.Course({
      approved: true,
      admin_id: user.authID,
      details: courseData.details,
    });

    await newCourse.save();
    let newResult = newCourse.toJSON();
    newResult = _.omit(newResult, ['admin_id']);

    await models.User.updateOne(
      { _id: user._id },
      { $push: { adminLanguages: newCourse._id } },
    );

    // Load and save the example units/lessons/vocab items for the course
    populateExampleData(newCourse._id);

    const { admin_name, admin_email, name, alternative_name, description, translated_language, iso, glotto, location, population, link } = newCourse.details;

    // build the url for approving or rejecting
    const protocol = req.protocol
    const host = req.hostname
    const url = req.originalUrl
    const port = process.env.PORT
    const fullUrl = `${protocol}://${host}:${port}${url}`

    sendEmail(
      undefined,
      'app@7000.org',
      '7000Languages: Pending Course Approval',
      'course-confirmation',
      {
        id: newCourse.id,
        admin_name,
        admin_email,
        name,
        alternative_name,
        description,
        translated_language,
        iso,
        glotto,
        location,
        population,
        link,
        base_url: fullUrl
      },
    );

    return sendResponse(
      res,
      200,
      'Successfully created a new course',
      newResult,
    );
  }),
);

/**
 * Fetches specified course in the database
 */
router.get(
  '/:id',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    let course = await models.Course.findOne({ _id: req.params.id });
    course = course.toJSON();
    let units = await models.Unit.find({ _course_id: req.params.id });

    let completedUnits = [];

    if (req.user.isLearner) {
      completedUnits = await getAllCompletedUnits(req.user._id, req.params.id);
    }

    for (var i = 0; i < units.length; i++) {
      const numLessons = await models.Lesson.countDocuments({
        _unit_id: { $eq: units[i]._id },
        selected: { $eq: true },
      });
      units[i] = units[i].toJSON();
      units[i].num_lessons = numLessons;

      if (req.user.isLearner) {
        units[i].complete = completedUnits.includes(String(units[i]._id));
      }
    }
    let newCourse = _.omit(course, ['admin_id']);
    const returnedData = {
      course: newCourse,
      units: units,
    };
    return sendResponse(res, 200, 'Successfully fetched course', returnedData);
  }),
);

/**
 * Approve a particular course
 */
router.post(
  '/approve/:id',
  errorWrap(async (req, res) => {
    let id = req.params.id;
    const course = await models.Course.findByIdAndUpdate(id, {
      approved: true,
    });
    course.save();

    // send approval email to creator of the course
    const { admin_email, name } = course.details;

    sendEmail(
      undefined,
      admin_email,
      '7000Languages: Course Approved',
      'course-approved',
      {
        name,
      },
    );

    res.render('course-approval-success', { pageTitle: 'Course approved' });
  }),
);

/**
 * Reject a particular course
 */
router.post(
  '/reject/:id',
  errorWrap(async (req, res) => {
    let id = req.params.id;
    const course = await models.Course.findByIdAndUpdate(id, {
      approved: false,
    });
    course.save();

    // send approval email to creator of the course
    const { admin_email, name } = course.details;

    sendEmail(
      undefined,
      admin_email,
      '7000Languages: Course Reject',
      'course-rejected',
      {
        name,
      },
      undefined
    );
    res.render('course-approval-success', { pageTitle: 'Course approved' });
  }),
);

/**
 * Deletes specified course and all references to this course in MongoDB and AWS S3
 */
router.delete(
  '/:id',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const course_id = req.params.id;

    // Make sure the course exists
    const courseToDelete = await models.Course.findById(course_id);

    if (courseToDelete) {
      // Remove text data from MongoDB
      await models.Course.deleteOne({ _id: ObjectId(course_id) });
      await models.Unit.deleteMany({ _course_id: ObjectId(course_id) });
      await models.Lesson.deleteMany({ _course_id: ObjectId(course_id) });

      // Remove reference to course from each user that has this course listed
      await models.User.updateMany(
        {},
        {
          $pull: {
            adminLanguages: course_id,
            learnerLanguages: course_id,
            collaboratorLanguages: course_id,
          },
        },
      );

      // Remove audio and image data from AWS
      await deleteFolder(course_id);

      return sendResponse(res, 200, 'Successfully deleted course');
    }
    return sendResponse(res, 404, 'Course not found');
  }),
);

module.exports = router;
