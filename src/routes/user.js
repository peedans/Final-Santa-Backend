const express =require('express');

const activityRouter =require('./activity');

const router =express.Router();


// ./me ส่งไป activity
router.use('/me/activity',activityRouter);

router.get('/me',(req,res,next)=>{});
router.put('/me',(req,res,next)=>{});

module.exports=router;
