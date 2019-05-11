const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        // connect to id in user model that Mongoose creates dynamically
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);