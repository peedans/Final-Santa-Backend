const express =require('express');

const activityRouter =require('./activity');

const router =express.Router();


//minddleware
const {auth,adminCheck} =require('../../middleware/auth');

const {listUsers,readUsers,updateUsers,removeUsers}=require('../controllers/user');


// ./me ส่งไป activity
router.use('/me/activity',activityRouter);

//@Endpoint http://localhost:7000/users/me
//@method get
//@Access Private
router.get('/me',auth,adminCheck,listUsers);

//@Endpoint http://localhost:7000/users/me
//@method get
//@Access Private
router.get('/me/:id',readUsers);

//@Endpoint http://localhost:7000/users/me
//@method put
//@Access Private
router.put('/me/:id',updateUsers);

//@Endpoint http://localhost:7000/users/me
//@method get
//@Access Private
router.delete('/me/:id',removeUsers);

module.exports=router;
