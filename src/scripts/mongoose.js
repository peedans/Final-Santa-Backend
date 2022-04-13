const mongoose =require('mongoose');
// mongoose promise

const run = async () => {
    const uri='mongodb+srv://m001-student:m001-mongodb-basics@cluster0.f8vau.mongodb.net/sample_training?retryWrites=true&w=majority';
    await mongoose.connect (uri);

    // const count = await mongoose.connection.db.collection('zips').find({}).count();
    // const zips = await mongoose.connection.db.collection('zips').find({}).toArray();
    // console.log(count);

    // schema เป็นเบ้า
    const schema =  mongoose.Schema({
        city: String,
        zip: String,
        loc: {y: Number, x: Number},
        pop: Number,
        state: {type:String,
        minLength :[2,'ต้องมีอย่างน้อย 2 ตัวอักษร'],
        maxLength:[3,'ต้องมีอย่างน้อย 3 ตัวอักษร'],
    },

    });

    const ZipModel = mongoose.model('Zip', schema, 'zips');
    
    //Get by id
    //get all
    //create
    //update
    //delete
    // ZipModel.findById('zip-001');
    // ZipModel.find({});
    // ZipModel.create();
    // ZipModel.updateMany({city:'ALPINE'},{pop:{$inc:10}});   
    // ZipModel.deleteMany({city:'ALPINE'});

    // const zips = await ZipModel.find({});
    // await ZipModel.updateMany({city:'ALPINE'},{pop:1000});

    // เพิ่มของ
// ืnewZip lnstance zipmode class
    const newZip = await ZipModel({
        city: 'BANGKOK',
        zip: 10400,
        loc:{x:100,y:200},
        pop:100000,
        state:'THAILAND',
    });

    await newZip.save();
    // console.log(zips);

    // console.log(zips[0]);

    const personSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
    });
    
    // ต้องใช้ เป็น function thisหมายถึงclass ที่กำลังสรา้งขึ้น
    personSchema.methods.getFullName = function() {
        return `${this.firstName} ${this.lastName}`;
    }

    const PersonModel = mongoose.model('person', personSchema ,'persons');

    const pee = new PersonModel ({firstName:'Pee',lastName:'Pee'});
    const fullName =pee.getFullName();
    console.log(fullName);
};


run()
.then(() => {
    console.log('Done');
    process.exit(0);
})
.catch((e)=>{
    console.log(e);
    process.exit(1)
});
