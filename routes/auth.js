const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();
const User = require('../model/User');
const { protect } = require('../middleware/protect');



// @route POST /register
// @desc Register a user
// @accsess public
router.post('/register', [
  check('firstName', 'Please write your name').not().isEmpty(),
  check('lastName', 'Please write your last name').not().isEmpty(),
  check('email', 'Please add a valid email').isEmail(),
  check('password', 'Password must be 6 at least chars long').isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Email alredy taken' }]
      });
    };


    user = await User.create(req.body);

    const token = user.getSignedJwtToken();


    res.status(201).json({
      success: true,
      token: token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    });
  }
});


// @route POST /auth/login
// @desc Login user
// @access Public
router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Invalid Credentials' }]
      });
    };

    const isMatched = await user.matchPassword(req.body.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Invalid Credentials' }]
      });
    };


    const token = user.getSignedJwtToken();


    res.status(200).json({
      success: true,
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    })
  }

});

// @route GET /auth/me
// @desc Get logged user
// @access Private
router.get('/me', [protect], async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      data: req.user
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    })
  }
})


module.exports = router;