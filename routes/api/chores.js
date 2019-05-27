const express = require('express');
const config = require('config');
const NodeGeocoder = require('node-geocoder');
const choresRouter = express.Router();

const Chore = require('../../models/Chores');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyDPGB8rFZ4Yx-tKuwdgbTWFjAG9eRMaAEw',
    formatter: null
};

const geocoder = NodeGeocoder(options);

choresRouter.route('/').get(function(req, res) {
    Chore.find(function(err, chores) {
        if (err) {
            console.log(err);
        } else {
            res.json(chores);
        }
    });
});

choresRouter.route(':id').get(function(req, res) {
    let id = req.params.id;
    Chore.findById(id, function(err, chore) {
        res.json(chore);
    });
});

choresRouter.route('/add').post(function(req, res) {
    
    geocoder.geocode(req.body.chore_address)
        .then(function(addressLocation) {
        let chore = new Chore({
           chore_description: req.body.chore_description,
           chore_responsible: req.body.chore_responsible,
           chore_address: addressLocation,
           chore_date: req.body.chore_date,
           chore_completed: req.body.chore_completed ,
           chore_phone: req.body.chore_phone,
           chore_accepted: req.body.chore_accepted
        });
        chore.save()
        .then(chore => {
            res.status(200).json({'chore': 'chore added successfully'});
        })
        .catch(err => {
            res.status(400).send(err);
        });
         
    })
        
});
    
    
    
    


choresRouter.route('/update/:id').post(function(req, res) {
    // console.log("route post: ");
    // console.log(req.params.id);
    Chore.findById(req.params.id, function(err, chore) {
        if (!chore)
            res.status(404).send('data is not found');
        else
            chore.chore_description = req.body.chore_description;
            chore.chore_responsible = req.body.chore_responsible;
            chore.chore_completed = req.body.chore_completed;
            chore.chore_address = req.body.chore_address;
            chore.chore_phone = req.body.chore_phone;
            chore.chore_accepted = req.body.chore_accepted;
            chore.save().then(chore => {
                res.json('chore updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = choresRouter;