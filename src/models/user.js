const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type:String,
    },
    password:{
        type:String,
        min: [8, 'Password must be at least 8 characters'], 
        max: [16, 'Password must be at most 16 characters'],
        validate: {
            validator: function(v) {
                        
            return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/.test(v);
        },
    },
},

    role:{
        type:String,
        default:'user'
    },
    enabled:{
        type:Boolean,
        default:true
    }


},{timestamps:true});

const userModel = mongoose.model('users', userSchema )

module.exports = userModel;


// Account :{type:Number, min: [0, 'Account must be at least 0']},
//     Name :{type:String, minLength: [3, 'Name should contains at least 3 char']},
//     Height :{type:Number, min: [0, 'Height must be at least 0']},
//     Weight :{type:Number, min: [0, 'weight must be at least 0']},
//     Age :{type:Number, min: [0, 'Age must be at least 0']},
//     Address :{type:String, minLength: [3, 'Address should contains at least 3 char']},