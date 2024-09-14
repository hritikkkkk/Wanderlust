const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAysnc = require("../utils/wrapAysnc.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

//post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAysnc(reviewcontroller.createReview)
);

//delete review route
router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAysnc(reviewcontroller.destroyReview)
);

module.exports = router;
