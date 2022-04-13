const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    ActivityList : {type :String, minLength: [3, 'Activity name should contains at least 3 char']},
    location: {type :String, minLength: [3, 'Activity name should contains at least 3 char']},
    Kcalories :{type:Number, min: [0, 'KiloCalories must be at least 0']},
    date:{type:String},
    Weightgoal: {type:Number, min: [0, 'WeightGoal must be at least 0']},
    Bmi: {type:Number, min: [0, 'Bmi must be at least 0']},
    Bodyfat: {type:Number, min: [0, 'BodyFat must be at least 0']},
    Tdee: {type:Number, min: [0, 'Tdee must be at least 0']},
    Description: {type :String, minLength: [3, 'Activity name should contains at least 3 char']},
});

const ActivityModel = mongoose.model('Activity', activitySchema,'santa' );


module.exports = ActivityModel;