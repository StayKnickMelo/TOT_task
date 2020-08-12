const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { protect } = require('../middleware/protect');
const Flood = require('../model/Flood');



// @route Get /
// @desc get all flood messages
// @access Private
router.get('/', protect, async(req,res)=>{
  try {
    const messages = await Flood.find();

    res.status(200).json({
      success: true,
      data: messages
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
    
  };
})

// @route POST /send
// @desc send a message
// @access Private
router.post('/send', [protect, [
  check('message', 'Please add some text').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  try {
    req.body.userId = req.user.id;
    req.body.userName = req.user.firstName;
    const message = await Flood.create(req.body);

    res.status(201).json({
      success: true,
      data: message
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    })
  }
});


// @route PUT /edit/:id
// @desc send a message
// @access Private
router.put('/edit/:id', [protect], async (req, res) => {
  try {
    let message = await Flood.findById(req.params.id);

    if (!message) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Not Found' }]
      })
    };

    if(message.userId.toString() !== req.user.id){
      return res.status(401).json({
        success: false,
        errors: [{msg: 'Unauthorized'}]
      })
    };

    message = await Flood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: message
    });



  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    })

  }
});

// @route DELETE /:id
// @desc delete a message
// @access Private
router.delete('/:id', protect, async(req,res)=>{
  try {
    const msg = await Flood.findById(req.params.id);

    if(!msg){
      return res.status(401).json({
        success: false,
        errors: [{msg: 'Message Not Found'}]
      });
    };

    if(msg.userId.toString()!== req.user.id){
      return res.status(401).json({
        success: false,
        errors: [{msg: 'Unauthorized'}]
      })
    };

    await msg.delete();

    res.status(200).json({
      success: true,
      deleted: true
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
});

module.exports = router