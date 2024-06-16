const mongoose=require('mongoose');
const submissionSchema=new mongoose.Schema({
     user:{type: mongoose.Schema.Types.ObjectId,required:true},
     contest:{type: mongoose.Schema.Types.ObjectId,required:true},
     code:{type:String},
     test_cases:{type:String},
     completion_time:{type:String},
     createdAt: { type: Date, required: true, default: Date.now},
     updatedAt:{ type:Date,required:true,default:Date.now()}
})

module.exports=Submissions=mongoose.model("Submissions",submissionSchema);