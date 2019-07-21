const express = require('express');
const dotenv = require('dotenv');

const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const App = express();

dotenv.config();

// import routes 
const todoRoute = require('./routes/todo.route');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

// init connection to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useFindAndModify: false
}, (err) => {
  err ? console.error(err) : console.log('MongoDB connected !!')
})

// middlewares
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(cors());

// router use
App.use('/todos', todoRoute);
App.use('/users', userRoute);
App.use('/auth', authRoute);

App.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});