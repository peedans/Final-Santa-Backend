const express = require('express');
// const { send } = require('express/lib/response');
// const res = require('express/lib/response');


const ActivityModel = require('../models/activity');


const router = express.Router();

router.use('/:activityDataId', async (req, res, next) => {
  const activityDataId = req.params.activityDataId;
  // Check if recordId is a valid mongodb objectId
  if (activityDataId && !activityDataId.match(/^[0-9a-fA-F]{24}$/)) {
    // You can response 400 too since client should request with valid it
    // But this way it's easier to handle status code
    return res.status(404).send('activityData not found');
  }
  const foundActivity = await ActivityModel.findById(activityDataId);
  if (!foundActivity) {
    return res.status(404).send('activityData not found');
  }
  req.activity = foundActivity;
  return next();
});


router.get('/:activityDataId', (req, res, next) => {
  return res.send(req.activity);
});


// get array ออกมา
router.get('/', async (req, res, next) => {
  const activitys = await ActivityModel.find({});
  res.send(activitys);
});



// สร้างไม่ต้องใส่ไอดี เพราะ ให้มันเจนเอง
// content type ส่งเป็น json
// validate backend สำคัญที่สุด ได้ข้อมูล เก็บใน database
router.post('/', async (req, res, next) => {
  // const param =req.params;
  // const query =req.query;
  const body = req.body;

  const newActivityModel = new ActivityModel(body);

  // console.log(validateResult);
  const errors = newActivityModel.validateSync();
  if (errors) {
    const errorFieldNames = Object.keys(errors.errors);
    if (errorFieldNames.length > 0) {
      return res.status(400).send(errors.errors[errorFieldNames[0]].message);
    }
  }
  await newActivityModel.save();

  return res.status(200).send("สร้างข้อมูลสำเร็จ");
});


router.put('/:activityDataId', async (req, res, next) => {
  // const param =req.params;
  // const query =req.query;
  const body = req.body;

  const newActivityModel = new ActivityModel(body);

  // console.log(validateResult);
  const errors = newActivityModel.validateSync();
  if (errors) {
    const errorFieldNames = Object.keys(errors.errors);
    if (errorFieldNames.length > 0) {
      return res.status(400).send(errors.errors[errorFieldNames[0]].message);
    }
  }
  await ActivityModel.findOneAndUpdate({ _id: req.params.activityDataId }, {
    // set ข้อมูลตัวใหม่
    $set: req.body

  })

  return res.status(200).send("อัพเดทข้อมูลสำเร็จ");
});

// router.put('/:id',async (req, res, next)=>{
//   const foundedId = req.params.activityDataId;
//   const body = req.body;
//   await ActivityModel.findOneAndUpdate({_id:foundedId,body})
//   console.log(ActivityModel)
//   .then(()=>{
//       res.status(201).send('update success')
//   })
//   .catch((err)=>{
//           const errorFieldNames = Object.keys(err.errors);
//           if (errorFieldNames.length >0 ){
//               return res.status(400).send(err.errors[errorFieldNames[0]].message);
//           }
//   })

// })



// router.delete('/:activityDataId', async (req, res, next) => {
//   await ActivityModel.deleteOne({ _id: req.params.activityDataId });
//   return res.status(204).send(); // 204 = No content which mean it successfully removed
// })
router.delete('/:activityDataId', async (req, res) => {
  try {
    const id = req.params.activityDataId;
    const activityModels = await ActivityModel.findOneAndDelete({ _id: id });
    res.send(activityModels);
    // console.log(activityModels);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
})

module.exports = router;


