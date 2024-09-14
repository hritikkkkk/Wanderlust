const express = require("express");
const router = express.Router();
const wrapAysnc = require("../utils/wrapAysnc.js");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAysnc(listingcontroller.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAysnc(listingcontroller.createlisting)
  );

router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

router
  .route("/:id")
  .get(wrapAysnc(listingcontroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("Listing[image]"),
    wrapAysnc(listingcontroller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAysnc(listingcontroller.destroyListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAysnc(listingcontroller.renderEditForm)
);

module.exports = router;
