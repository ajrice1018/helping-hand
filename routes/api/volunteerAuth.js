const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/VolunteerUser');

// @route   GET api/auth 
// @desc    Test route 
// @access  Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User
            .findById(req.user.id)
            .select('-password');
        res.json(user)

    } catch (err) {
        console.error(error.message);
        res
            .status(500)
            .send('Server Error');
    }

});

// @route   GET api/auth 
// @desc Authenticate user & get token 
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }

    const {email, password} = req.body;

    try {
        // See if the user exists
        let user = await User.findOne({email});
        if (!user) {
            return res
                .status(400)
                .json({
                    errors: [
                        {
                            msg: 'Invalid Credentials'
                        }
                    ]
                });
        }

        //    make sure password matches - password is plain text password entered and
        //    user.password is the stored password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res
                .status(400)
                .json({
                    errors: [
                        {
                            msg: 'Invalid Credentials'
                        }
                    ]
                });
        }
        // Return jsonwebtoken
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