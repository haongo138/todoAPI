const User = require('../models/user.model');

module.exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

module.exports.getOne = (req, res) => {
  res.status(200).send(req.user);
}

module.exports.addNewUser = async (req, res) => {
  const { username, password } = req.body;
  const existedUser = await User.findOne({ username: username });
  if(existedUser) {
    return res.status(401).send("This user have already existed. Please choose another");
  }
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    return res.json(newUser);
  } catch (err) {
    console.log(err);
  }

}