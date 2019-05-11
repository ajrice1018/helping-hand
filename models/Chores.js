const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chore = new Schema({
    chore_description: {
        type: String
    },
    chore_responsible: {
        type: String
    },
    chore_priority: {
        type: String
    },
    
    chore_completed: {
        type: Boolean
    },
    location: {
       type: {
           type: String,
           enum :['Point'],
           
       },
       coordinates:{
           type:[Number],
        }
    }
});

module.exports = mongoose.model('Chore', Chore);