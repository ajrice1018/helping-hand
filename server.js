const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Connect database
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Connect to the Mongo DB
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

// Init Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }


// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/volunteerUsers', require('./routes/api/volunteerUsers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/volunteerAuth', require('./routes/api/volunteerAuth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/volunteerProfile', require('./routes/api/volunteerProfile'));
app.use('/chore', require('./routes/api/chores'));



app.listen(PORT, () => console.log(`server started on port ${PORT}`));