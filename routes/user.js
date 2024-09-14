const express = require("express");
const router = express.Router();

const wrapAysnc = require("../utils/wrapAysnc");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js");

router
  .route("/signup")
  .get(usercontroller.renderSignupForm)
  .post(wrapAysnc(usercontroller.signup));

router
  .route("/login")
  .get(usercontroller.renderLoginform)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usercontroller.login
  );

router.get("/logout", usercontroller.logout);

module.exports = router;
