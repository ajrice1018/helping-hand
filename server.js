require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI

// Init Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));


// Connect database
// const mongoose = require('mongoose');
// const config = require('config');
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });

// Connect to the Mongo DB
// mongoose.connect(MONGODB_URI, { useCreateIndex: true, useFindAndModify: false});



// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/volunteerUsers', require('./routes/api/volunteerUsers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/volunteerAuth', require('./routes/api/volunteerAuth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/volunteerProfile', require('./routes/api/volunteerProfile'));
app.use('/chore', require('./routes/api/chores'));



app.listen(PORT, () => console.log(`server started on port ${PORT}`));