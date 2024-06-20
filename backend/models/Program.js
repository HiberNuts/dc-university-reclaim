const mongoose=require('mongoose');
const testCaseSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true }
  });
const programSchema=new mongoose.Schema({
    strapiId:{type:Number},
    strapiContestId:{type:String},
    contestId:{type: mongoose.Schema.Types.ObjectId,required:true},
    duration:{type:String},
    boilerplate_code:{type:String},
    description:{type:Array},
    test_cases:{ type :[testCaseSchema]}
})

module.exports=Programs=mongoose.model("Programs",programSchema);