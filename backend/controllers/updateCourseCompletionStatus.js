const db = require("../models");
const {checkifUserCompletedCourse}=require("./userController")
const User = db.user;
module.exports=updateCourseCompletionStatus=async(userId)=>{
    const user=await User.findOne({_id:userId})
    const enrolledCourses=[...user.enrolledCourses]
    if(!enrolledCourses?.length) return
    for(let i=0;i<enrolledCourses.length;i++){
            const {overallCompletionPercentage}=await checkifUserCompletedCourse({userId,courseId:enrolledCourses[i].courseId})
            if(overallCompletionPercentage==100) enrolledCourses[i]={...enrolledCourses[i],courseCompleted:true}
    }
    await User.updateOne({_id:userId},{$set:{enrolledCourses}})
}