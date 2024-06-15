const mongoose = require("mongoose");
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
})

module.exports=Contests=mongoose.model("Contests", contestSchema)