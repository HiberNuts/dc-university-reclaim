const mongoose=require('mongoose');
const testResultSchema=new mongoose.Schema({
     passed:{type:Boolean},
     description:{type:String},
     error:{type:String}
})
const submissionSchema=new mongoose.Schema({
     user:{type: mongoose.Schema.Types.ObjectId,required:true},
     contest:{type: mongoose.Schema.Types.ObjectId,required:true},
     code:{type:String},
     status:{
          type: String,
          enum: ['progress','completed'],
          default:"progress"
     },
     rank:{type:Number,default:-1},
     amountEarned:{type:String},
     xp:{type:Number},
     walletAddress:{type:String},
     passedCases:{type:Number},
     totalCases:{type:Number},
     testResults:{type:[testResultSchema]},
     submittedTime:{type:Date},
     submittedCode:{type:String},
     createdAt: { type: Date, required: true, default: Date.now},
     updatedAt:{ type:Date,required:true,default:Date.now()}
})

module.exports=Submissions=mongoose.model("Submissions",submissionSchema);