const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/VolunteerUserSchema');

// @route   GET api/users 
// @desc    Register user 
// @access  Public
router.post('/', [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }

    const {firstName, lastName, email, password} = req.body;

    try {
        // See if the user exists
        let user = await VolunteerUserSchema.findOne({email});
        if (user) {
            return res
                .status(400)
                .json({
                    errors: [
                        {
                            msg: 'User already exists'
                        }
                    ]
                });
        };

        // creates a new user
        user = new VolunteerUserSchema({firstName, lastName, email, password});
        // Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // save user to database
        await user.save();

        // Return jsonwebtoken - for user to be logged in right away
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) 
                throw err;
            res.json({token});
        })
        // res.send('User registered')
    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server error');
    }

});

module.exports = router;