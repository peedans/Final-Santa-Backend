const bcrypt = require('bcryptjs');
const User =require('../models/user');
const jwt = require('jsonwebtoken');

exports.listUsers = async(req, res) => {

    try{
        const user = await User.find({}).select('-password').exec();
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.readUsers = async(req, res) => {

    try{
        // "625821000a625f322d151db2"
        // ดูแค่ id เดียว
        const id = req.params.id;
        const user = await User.findOne({_id:id}).select('-password').exec();
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.updateUsers = async(req, res) => {

    try{
        res.send('hello update users');
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.removeUsers = async(req, res) => {

    try{
        const id = req.params.id;
        const user = await User.findOneAndDelete({_id:id});
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}