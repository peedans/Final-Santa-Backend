const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Account :{type:Number, min: [0, 'Account must be at least 0']},
    Name :{type:String, minLength: [3, 'Name should contains at least 3 char']},
    Height :{type:Number, min: [0, 'Height must be at least 0']},
    Weight :{type:Number, min: [0, 'weight must be at least 0']},
    Age :{type:Number, min: [0, 'Age must be at least 0']},
    Address :{type:String, minLength: [3, 'Address should contains at least 3 char']},

});

const userModel = mongoose.model('Activity', userSchema,'santa' )

module.exports = userModel;