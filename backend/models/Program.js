const mongoose=require('mongoose');
const programSchema=new mongoose.Schema({
    strapiId:{type:Number},
    strapiContestId:{type:String},
    contestId:{type: mongoose.Schema.Types.ObjectId,required:true},
    duration:{type:String},
    boilerplate_code:{type:String},
    description:{type:Array}
})

module.exports=Programs=mongoose.model("Programs",programSchema);