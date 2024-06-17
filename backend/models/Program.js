const mongoose=require('mongoose');
const programSchema=new mongoose.Schema({
    strapiId:{type:Number},
    contestId:{type:String},
    duration:{type:String},
    boilerplate_code:{type:String},
    description:{type:Array}
})

module.exports=Programs=mongoose.model("Programs",programSchema);