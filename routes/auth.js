// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const payBoardUri = process.env.PAY_BOARD_URL
// @desc   Auth with Google
// @route  GET /auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc   Google auth callback
// @route  GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect(`${payBoardUri}`);
  }
);

// @desc   Logout user
// @route  GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect(`${payBoardUri}`);
    });
});

// @desc   Get current user
// @route  GET /auth/user
router.get('/user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
