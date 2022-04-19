// เป็น framework ของ node js เกี่ยวกับserver
const express = require('express');
// รวมbodyทั้งหมด มันไม่สามารถ ส่งข้อมูลไปเป็นก้อนได้ เลยใช้ body-parser
// รับส่งข้อมูล clinet กับ server
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// จัดการเกี่ยว กับ api
const cors = require('cors');
const morgan =require('morgan');

const PORT = process.env.PORT || 7000;


const config = require('../src/config');
// เอาไว้เก็บข้อมูลต่างๆๆ

// คือการอ่าน Directory ใน Folder routes อัตโนมัติ
const { readdirSync } = require('fs');
const userRouter=require('../src/routes/user');


// ประกาศตัวแปร app
const app = express();
//middleware
// morgan ว่ามีใครทำ api ของเรา
app.use(morgan('dev'));

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(config.mongoUri, config.mongoOptions);
      return next();
    });
  }

// เป็นตัวจัดการกับ req หน้าบ้านที่ส่งมาหลังบ้าน
// limit ถ้าไม่ได้กำหมด หรือกำหนดน้อยไป เวลาเรามี req ข้อมูลมาเยอะ serverจะไม่ยอม
app.use(bodyParser.json({limit:'20mb'}));


// การดึงapi จากเว็บนอก
app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );
app.use('/users',userRouter)

//Route
// http://localhost:7000/login/
//เรียกใช้งาน route login
// วิธี ที่1
app.use('/api',require('../src/routes/api'));
app.get("/", (res, req) => {res.send("Hello World")});

//วิธีที่2
// readdirSync('./routes').map((r)=>console.log(r));

module.exports = app;
