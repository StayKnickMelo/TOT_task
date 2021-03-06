const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../model/User');


exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  };


  if (!token) {
    return res.status(401).json({
      success: false,
      errors: [{ msg: 'Unauthorized' }]
    })
  };

  try {

    const decoded = jwt.verify(token, config.get('JwtSecret'));
    req.user = await User.findById(decoded.id);
    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    })
  }
}