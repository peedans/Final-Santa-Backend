const mongoose = require('mongoose');
const app = require('../api/index');


const config = require('./config');


const boot =async()=>{
    //connect to mongodb
    await mongoose.connect(config.mongoUri,config.mongoOptions);
    
    //start express server
app.listen(config.port,()=>{
    console.log(`Server is listening on port ${config.port}`);
});

};

boot();




