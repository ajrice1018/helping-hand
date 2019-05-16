const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerProfileSchema = new Schema({
    user: {
        // connect to id in user model that Mongoose creates dynamically
        type: mongoose.Schema.Types.ObjectId,
        ref: 'volunteer-user'
    },
    firstName: {
        type: String
        // ,
        // required: true

    },
    lastName: {
        type: String
        // ,
        // required: true

    },
    email: {
        type: String,
        // required: true
    },
    phoneNumber: {
        type: String
        // ,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = VolunteerProfile = mongoose.model('volunteer-profile', VolunteerProfileSchema);