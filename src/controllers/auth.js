const bcrypt = require('bcryptjs');
const User =require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    try{
        //check user
        // สร้างตัวแปรมารองรับ
        const {username,password}=req.body;
        // เช็คตัวโมเดล , ค้นหาว่ามี usernameนี้หรือยัง
        var user=await User.findOne({username});
        //เช็ค user
        // อย่าลืม return ถ้าเช็คแล้วเจอ user จะไม่ไปทำบรรทัดทัดไป
        // ถ้ามี userซำ้ userนี้จะไม่พร้อมใช้งาน
        if(user){
            return res.status(400).send('User already exists');
        }
        // เข้ารหัส password
        //slat มั่่วเลข ยำรวมกัน
        const salt =await bcrypt.genSalt(10)
        // สร้างลง ฐานข้อมูล
        user = new User({
            username,
            password,
        });

        //Encrypt password
        //hash,bcrypt เข้ารหัส password
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        res.send('Register Success');
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.login = async(req, res) => {
    try{
        const {username,password}=req.body;
        var user = await User.findOneAndUpdate({username},{new:true});
        // user.enabled จะต้องเป็น true เพื่อให้เข้ารหัสผ่านได้
        if(user && user.enabled){

            //checkPassword
            // bcryptถอดรหัส รหัสในฐานข้อมูลเข้ารหัสยุโดยใช้compare
            // password ที่userกรอกมา user.passwordกับรหัสในฐานข้อมูล
            const isMatch = await bcrypt.compare(password,user.password);
            // console.log(isMatch)
            // res.send('hello login');
            // ถ้ารหัสไม่ตรง
            if(!isMatch){
               return res.status(400).send('Password Invalid');
            }

            //payload
            const payload={
                user:{
                    username: user.username,
                    role:     user.role,
                },
            };

            //Generate token
            // (err,token) callback   
            jwt.sign(payload,
                'jwtSecret',
                {expiresIn:3600},
                // ออกไปหน้าบ้าน
                (err,token)=>{
                    if(err) throw err;
                    res.json({token,payload});
                });
        }else{
            return res.status(400).send('User not found');
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}


exports.currentUser = async(req, res) => {
    try{
        //model User
        // console.log('controller',req.user);
        const user = await User.findOne({username: req.user.username})
        .select('-password')
        .exec();
        // console.log('user',user);
        res.send(user);

    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.listUser = async(req, res) => {

    try{
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.editUser = async(req, res) => {
    try{
        res.send('editUser');
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}


exports.deleteUser = async(req, res) => {
    try{
        res.send('deleteUser');
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

// เมื่อ password ถูก เขาเจนโทเค็น ชื่ออะไร tokenหมดอายุ ไล่ให้ไปlogin ใหม่