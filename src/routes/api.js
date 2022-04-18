const express= require('express');
const router =express.Router()

const {register,listUser,editUser,deleteUser,login,currentUser}=require('../controllers/auth');

//middleware
const { auth,adminCheck } = require('../../middleware/auth');

//@Endpoint http://localhost:7000/api/register
//@method post การส่งข้อมูล
//@Access Public
router.post('/register',register);

//@Endpoint http://localhost:7000/api/login
//@method post การส่งข้อมูล
//@Access Public
router.post('/login',login);


//@Endpoint http://localhost:7000/api/1
// ถ้าmiddle ware ให้คุณไปต่อ ถึงไปทำ controllers
// ถ้า middele wareไม่ได้ไม่ให้คุณต่อไปทำ controllers
// ต้องมี token ด้วยนะถึงส่งไปได้
// router.get('/1',auth,(req,res)=>{
//     res.send('hello 1')
// })


//@Endpoint http://localhost:7000/api/current-user
//@method post การส่งข้อมูล
//@Access Private
// ถ้าmiddle ware ให้คุณไปต่อ ถึงไปทำ controllers
// ถ้า middele wareไม่ได้ไม่ให้คุณต่อไปทำ controllers
// ต้องมี token ด้วยนะถึงส่งไปได้
router.post('/current-user',auth,currentUser);

//@Endpoint http://localhost:7000/api/current-admin
//@method post การส่งข้อมูล
//@Access Private
router.post('/current-admin',auth,adminCheck,currentUser);


//@Endpoint http://localhost:7000/api/auth
//@method GET การดึงข้อมูล
//@Access Public
router.get('/auth',listUser);




//@Endpoint http://localhost:7000/api/auth
//@method put การแก้ไขข้อมูล
//@Access Public
router.put('/auth',editUser);

//@Endpoint http://localhost:7000/api/auth
//@method delete การลบข้อมูล
//@Access Public
//ของใหม่
router.delete('/auth',deleteUser);

// ของเดิม
// router.delete('/auth',(req,res,next)=>{
//     res.send('Hello World apipee delete');
// });


module.exports=router;