const listing = require("../models/listings");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res) => {
  let Listing = await listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  Listing.reviews.push(newReview);

  await newReview.save();
  await Listing.save();
  req.flash("success", "new Review Created!");

  res.redirect(`/listings/${Listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review Deleted!");
  res.redirect(`/listings/${id}`);
};
