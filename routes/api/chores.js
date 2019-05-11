const express = require('express');
const config = require('config');
const choresRouter = express.Router();

const Chore = require('../../models/Chores');

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
    // let chore = new Chore(req.body);
    // chore.save()
    //     .then(chore => {
    //         res.status(200).json({'chore': 'chore added successfully'});
    //     })
    //     .catch(err => {
    //         res.status(400).send('adding new chore failed');
    //     });
    console.log(req.body)
    res.json();
});

choresRouter.route('/update/:id').post(function(req, res) {
    Chore.findById(req.params.id, function(err, chore) {
        if (!chore)
            res.status(404).send('data is not found');
        else
            chore.chore_description = req.body.chore_description;
            chore.chore_responsible = req.body.chore_responsible;
            chore.chore_priority = req.body.chore_priority;
            chore.chore_completed = req.body.chore_completed;
            chore.location = requ.body.location;
            chore.save().then(chore => {
                res.json('chore updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = choresRouter;