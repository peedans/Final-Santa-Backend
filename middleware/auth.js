const jwt = require('jsonwebtoken');
// ถ้ามีการเข้าถึงหน้านี้จะต้องมีการส่ง token มาด้วย จะต้องมีการตรวจสอบว่า token นั้นมีอยู่หรือไม่ ถ้าไม่มีจะไม่สามารถเข้าถึงหน้านี้ได้
const User = require("../src/models/user");

exports.auth = (req, res, next) => {

    try {
        // ส่งมาทาง headerขื่อauthtoken
    
        const token = req.headers['authtoken'];
        // เช็คว่ามี token หรือไม่
        // ถ้าไม่มี token
        if(!token) {
           return res.status(401).send("no token, authorization denied");
        } 
        // ถ้ามีtoken
        const decoded = jwt.verify(token, 'jwtSecret');
        // รับค่าที่ decoded ได้
        // decoded คือตัวเลขที่ส่งมาจากการส่ง token มา
        // console.log("decoded", decoded);
        // จะเข้าถึงuser
        // เก็บค่าที่ได้ไว้ใน req.user
        console.log("middleware", decoded);
        req.user = decoded.user;
        next()
    } catch (err) {
        console.log(err)
        res.status(401).send('Token is not valid');
    }
};

exports.adminCheck = async(req, res, next) => {
    try {
      const { username } = req.user
      const adminUser = await User.findOne({ username }).exec()
  
      
      console.log('middleware adminCheck',adminUser)
      
      if(adminUser.role !== 'admin'){
        res.status(403).send(err,'Admin Access denied')
      } else{
        next()
      }
    } catch (err) {
      console.log(err);
      res.status(401).send("Admin Access denied");
    }
  };















// เมื่อได้token มา บรรทัด9

// decode มาจาก token ที่ส่งมา บรรทัด16

// token มาถอดรหัสจากการส่งมา บรรทัด16

// เก็บในตัวแปร req.user

// next ไปทำ controllers ต่อ