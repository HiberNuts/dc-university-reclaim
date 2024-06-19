const db = require("../models");
const Contests = db.Contests;
const Programs = db.Programs;
const Submissions=db.Submissions;
var solc = require('solc');


//LATEST CONTEST
exports.getLatestContest=async(req,res)=>{
   try {
        const latestContest = await Contests.findOne().sort({ createdAt: -1 });
        if (!latestContest) {
          return res.status(404).send({ error: true, message: "No contests found" });
        }
        res.status(200).send(latestContest);
   } catch (error) {
      res.status(500).send({error:true,message:error.messgae});
   }
}

// GET 3 UPCOMING CONTESTS 
exports.getUpcomingContests = async (req, res) => {
  try {
    const today = new Date().toISOString();
    const upcomingContests = await Contests.find({
      endDate: { $gt: today }
    })
    .sort({ endDate: 1 })
    .limit(req.params.limit);
    if (upcomingContests.length === 0) {
      return res.status(404).send({ error: true, message: "No upcoming contests found" });
    }
    res.status(200).send(upcomingContests);
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};
//ALL CONTESTS
exports.getAllContests=async(req,res)=>{
  try {
    const allContests=await Contests.find();
    console.log("LENGTH-->",allContests.length);
    res.status(200).send(allContests);
  } catch (error) {
    res.status(500).send({error:true,message:error.message});
  }
}
//GET PASTCONTESTS
exports.getPastContests=async(req,res)=>{
    try {
      const today = new Date().toISOString();
      const pastContests = await Contests.find({
        endDate: { $lt: today }
      }).sort({ endDate: -1 });
      if (pastContests.length === 0) {
        return res.status(404).send({ error: true, message: "No past contests found" });
      }
       res.status(200).send(pastContests);
    } catch (error) {
       res.status(500).send({error:true,message:error.message});
    }
}
//GET CONTEST BY ID
exports.getContestByID=async(req,res)=>{
    try {
      const contest=await Contests.findById(req.body.id);
      res.status(200).send(contest);
    } catch (error) {
       res.status(500).send({error:true,message:error.message});
    }
}
//GET CONTEST BY TITLE
exports.getContestByTitle=async(req,res)=>{
  try {
    const contest=await Contests.find({title:req.params.title});
    res.status(200).send(contest);
  } catch (error) {
      res.status(500).send({error:true,message:error.message});
  }
}
//GET PROGRAM BY STRAPI-CONTESTID
//PROGRAM SCREEN SHOULD BE ACCESIBLE IF USER LOGINS
exports.getProgram=async(req,res)=>{
    try {
          const Submisison=await Submissions.findById(req.body.submissionId);
          if(!Submisison)
             return res.json(404).send({error:true,message:"Invalid submission!"});
          // const Program=await Program.findOne({contestId:Submission.contest});
          const Contest=await Contests.findById(Submisison.contest);
          const Program=await Programs.findOne({contestId:Submisison.contest});
          if(!Contest)
              return res.status(404).send({error:true,message:"Contest not found for the submission"});
          if(!Program)
              return res.status(404).send({error:true,message:"Program not found for the submission"});
          return res.status(200).send({error:false,Program:Program,Contest:Contest});
      //  const Program=await Programs.findOne({contestId:req.params.contestId});
      //  if(!Program)
      //    return res.status(404).send({error:true,message:"Program not found"});
      //  return res.status(200).send(Program);
    } catch (error) {
        res.status(500).send({error:true,message:error.message});
    }
}


//SUBMISSIONS
exports.createSubmission=async(req,res)=>{
  try {
     console.log("USER REGISTERING FOR CONTEST --->",req.userId);
    //  console.log("REQ. BODY--->",req.body);   
    
     const contest = await Contests.findById(req.body.contest);
     if (!contest) {
       console.log("CONTEST NOT EXIXTS IN DB");
       return res.status(404).json({error:true,message: "Contest not found" });
     }
    
     const isSubmissionExist=await Submissions.findOne({contest:contest._id})
     if(isSubmissionExist){
       console.log("USER ALREADY REGISTERED FOR THE CONTEST[-]");
       return res.status(200).json({error:false,submissionId:isSubmissionExist._id,message:"User already Registered for the contest!"});
     }
    //IF NOT EXIST THEN CREATE
     const newSubmission = new Submissions({
       user: req.userId,
       contest: contest._id, 
     });
     console.log("NEW SUBMISSION SAVED[+]")
     await newSubmission.save();
    //  The submisison schema contains User ID and ContestID , & program schema contains contestID, so with submission schema ID, we can map user&contest&program&submission schemas
     return res.status(200).json({error:false,submissionId:newSubmission._id,message:"New Registration created"}); 
  } catch (error) {
     console.log("ERROR IN CREATING SUBMISSION SCHEMA");
     console.log(error.message);
     return res.status(500).json({error:true,message:error.message});
  }
}
//TO CHECK USER ALREADY REGISTERED FOR THE CONTEST
exports.alreadyRegistered=async(req,res)=>{
  try {
    const isSubmissionExist=await Submissions.findOne({contest:req.body.contest,user:req.userId})
    if(isSubmissionExist){
      console.log("USER ALREADY REGISTERED FOR THE CONTEST[-]");
      return res.status(200).json({error:false,message:"User already Registered for the contest!"});
    }
    return res.status(200).json({error:false,message:"User not registered"});
  } catch (error) {
     res.status(500).send({error:true,message:error.message});
  }
}

//COMPILER
exports.compiler = async (req, res) => {
    try {
      const {content}=req.body
      console.log(content)
      var input = {
        language: 'Solidity',
        sources: {
          'test.sol': {
            content,
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
      
      var output = JSON.parse(solc.compile(JSON.stringify(input)));
      for (var contractName in output.contracts['test.sol']) {
        console.log(
          contractName +
            ': ' +
            output.contracts['test.sol'][contractName].evm.bytecode.object
        );
      }
      res.status(200).send(output)
    } catch (error) {
      console.error("Error while compiling", error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };


//WEBHOOKS
exports.createModel=async(req,res)=>{
    try{
           if(req.body.model=='contest')
             await createContest(req)
           if(req.body.model=="program")
             await createProgram(req)
           res.status(200).send(createdContest)
    }
    catch(error)
    {
      res.status(500).send({ message: error.message || "Internal Server Error", error });
    }
}

exports.updateModel=async(req,res)=>{
  try{
    // console.log("--->",req.body);
    if(req.body.model=='contest')
      await updateContest(req)
    if(req.body.model=="program")
      await updateProgram(req)
    res.status(200).send({error:false,message:"Entry updated in db"})
  }
  catch(error)
  {
  res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}


createContest = async (req) => {
    try {
      const {id:strapiId,title,description,participants,startDate,endDate,image,details,rules,warnings,level,prize}=req.body.entry
      const mappedRules=req.body.entry.rules[0].children.map(child=>child.children[0].text)
      const mappedWarnings=req.body.entry.warnings[0].children.map(child=>child.children[0].text)
      const createdContest=new Contests({strapiId,title,participants,startDate,endDate,image:image.url,details,rules:mappedRules,warnings:mappedWarnings,level,prize})
      await createdContest.save()
      console.log("new contest saved[+]")
    } catch (error) {
      console.log("Failed to save contest");
      return;
    }
  };

updateContest=async(req,res)=>{
    try {
        const { id: strapiId, title, description, participants, startDate, endDate, image, details, rules, warnings, level,prize } = req.body.entry;
        const mappedRules = req.body.entry.rules[0].children.map(child => child.children[0].text);
        const mappedWarnings = req.body.entry.warnings[0].children.map(child => child.children[0].text);

        const updateData = {
          title,
          description,
          participants,
          startDate,
          endDate,
          image: image.url,
          details,
          rules: mappedRules,
          warnings: mappedWarnings,
          level,
          prize
        };
        const updatedContest = await Contests.findOneAndUpdate(
          { strapiId: strapiId },
          updateData,
          { new: true, useFindAndModify: false } // new: true returns the updated document
        );
      
        if (!updatedContest) {
          console.log("Contest failed to update becoz not found in db");
          return;
        }
        console.log("contest update done")
        return;

    }
    catch(error)
    {
       console.log(error.message);
       console.log("Contest failed to update")
    }
}

createProgram=async(req)=>{
  try{
     const {id:strapiId,contestid:strapiContestId,duration,boilerplate_code,description}=req.body.entry;
     const contest=await Contests.findOne({strapiId:strapiContestId});
     if(!contest)
      {
        console.log("Contest not exist for the program");
        return ;
      }
     const mappedDescription=description[0].children.map(child=>child.children[0].text);
     const createdProgram=new Programs({strapiId,strapiContestId,contestId:contest._id,duration,boilerplate_code,description:mappedDescription});
     await createdProgram.save();
     console.log("new program saved[+]");
  }
  catch(error)
  {
    console.log(error.message);
    console.log("Failed to save new program")
  }
}

updateProgram=async(req)=>{
  try {
      const {id:strapiId,contestid:strapiContestId,duration,boilerplate_code,description}=req.body.entry;
      const mappedDescription=description[0].children.map(child=>child.children[0].text);
      const updateData = {
        duration,
        strapiContestId,
        boilerplate_code,
        description:mappedDescription
      };
      const updatedProgram = await Programs.findOneAndUpdate(
        { strapiId: strapiId },
        updateData,
        { new: true, useFindAndModify: false } // new: true returns the updated document
      );
    
      if (!updatedProgram) {
        console.log("Update failed, program not found in db")
      }
      console.log("program update done")
      return;

  }
  catch(error)
  {
     console.log(error.message)
     console.log("Failed to update program");
  }
}
