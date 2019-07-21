const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { secretOrKey } = require('../key'); // JWT Secret Key

module.exports.auth = async (req, res) => {
  const searchedUser = await User.findOne({username: req.body.username, password: req.body.password });
  if (!searchedUser){
    return res.status(400).send('Invalid username or password !!');
  }
  const token = jwt.sign({ userId: searchedUser.id }, secretOrKey);
  return res.status(200).json({
    userId: searchedUser.id,
    token: token
  });
}

module.exports.checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // validate token
    jwt.verify(token, secretOrKey, (err, payload) => {
      if(payload) {
        req.user = payload;
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
    });
  } catch(err) {
    res.status(401).send('No token provided');
  }
}

module.exports.checkExist = (req, res, next) => {
  if(req.user) {
    return next();
  }
  res.status(401).send('Unauthorized');
}