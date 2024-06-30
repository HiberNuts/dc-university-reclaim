const mongoose = require("mongoose");
const rewardSchema=new mongoose.Schema({
    id:{type:Number},
    rank:{type:Number},
    prize:{type:String}
});

const contestSchema = new mongoose.Schema({
        strapiId:{type:Number},
        description:{type:String},
        title:{type:String},
        participants:{type:Number},
        startDate:{type:Date},
        endDate:{type:Date},
        image:{type:String},
        details:{type:String},
        rules:{type:Array},
        warnings:{type:Array},
        level: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy",
        },
        softDelete:{type:Boolean,default:false},
        prize:{type:String},
        reward:{type:[rewardSchema]},
        createdAt: { type: Date, required: true, default: Date.now},
        updatedAt:{ type:Date,required:true,default:Date.now()}
})

module.exports=Contests=mongoose.model("Contests", contestSchema)