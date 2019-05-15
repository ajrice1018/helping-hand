const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me 
// @desc    Get current user's profile 
// @access  Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile
            .findOne({user: req.user.id})
            .populate('user', ['firstName']);
        if (!profile) {
            return res
                .status(400)
                .json({msg: 'There is no profile for this user'})
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error')
    }
});






// @route   POST api/profile 
// @desc    Create or update a user profile 
// @access  Private
router.post('/', [
    auth,
    [
        check('firstName', 'First Name is required')
            .not()
            .isEmpty(),
        check('lastName', 'Last name is required')
            .not()
            .isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }
    const {
        email,
        firstName,
        lastName,
        bio,
        location,
        phoneNumber,
    } = req.body;

    // Build Profile Object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (email) 
        profileFields.email = email;
    if (firstName) 
        profileFields.firstName = firstName;
    if (lastName) 
        profileFields.lastName = lastName;
    if (bio) 
        profileFields.bio = bio;
    if (location) 
        profileFields.location = location;
    if (bio) 
        profileFields.phoneNumber = phoneNumber;
   
    try {
        let profile = await Profile.findOne({user: req.user.id});

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {new: true});
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields)

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
})










// @route   Get api/profile 
// @desc    Get all profiles 
// @access  Public
router.get('/', async(req, res) => {
    try {
        // find all profiles. Add names which are part of the 'user'
        // collection (defined in the model)
        const profiles = await Profile
            .find()
            .populate('user', ['firstName'])
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
});

// @route   Get api/profile/user/:user_id 
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async(req, res) => {
    try {
        // find all profiles. Add names which are part of the 'user'
        // collection (defined in the model)
        const profile = await Profile
            .findOne({user: req.params.user_id})
            .populate('user', ['firstname']);
        // if no profile is created send error
        if (!profile) 
            return res.status(400).json({msg: "Profile not found"});
        
        res.json(profile);

        // catch will run for any invalid object IDs
    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res
                .status(400)
                .json({msg: "Profile not found"})
        }
        res
            .status(500)
            .send('Server Error');
    }
});

// @route   DELETE api/profile 
// @desc    Delete profile, user and posts 
// @access  Private
router.delete('/', auth, async(req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        // remove user
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'User deleted'});
    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
});




module.exports = router;