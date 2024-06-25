const db = require("../models");
const Users=db.user;
const Contests = db.Contests;
const Programs = db.Programs;
const Submissions=db.Submissions;
const {rankSubmissions}=require('../utils/leaderboardCalculator')
const {formatResponse}=require('../utils/formatResponse');

//LATEST CONTEST
exports.getLatestContest = async (req, res) => {
  try {
    const latestContest = await Contests.findOne().sort({ createdAt: -1 });
    if (!latestContest) {
      return res.status(404).send(formatResponse(true, "No contests found"));
    }
    res.status(200).send(formatResponse(false, "Latest contest fetched successfully", latestContest));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

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
      return res.status(404).send(formatResponse(true, "No upcoming contests found"));
    }
    res.status(200).send(formatResponse(false, "Upcoming contests fetched successfully", upcomingContests));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

//ALL CONTESTS
exports.getAllContests = async (req, res) => {
  try {
    const allContests = await Contests.find();
    res.status(200).send(formatResponse(false, "All contests fetched successfully", allContests));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

//GET PAST CONTESTS
exports.getPastContests = async (req, res) => {
  try {
    const today = new Date().toISOString();
    const pastContests = await Contests.find({
      endDate: { $lt: today }
    }).sort({ endDate: -1 });
    if (pastContests.length === 0) {
      return res.status(404).send(formatResponse(true, "No past contests found"));
    }
    res.status(200).send(formatResponse(false, "Past contests fetched successfully", pastContests));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

//GET CONTEST BY ID
exports.getContestByID = async (req, res) => {
  try {
    const contest = await Contests.findById(req.body.id);
    res.status(200).send(formatResponse(false, "Contest fetched successfully", contest));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

//GET CONTEST BY TITLE
exports.getContestByTitle = async (req, res) => {
  try {
    // console.log("title-->",req.params.title);
    const contest = await Contests.find({ title: req.params.title });
    res.status(200).send(formatResponse(false, "Contest fetched successfully", contest));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

//GET PROGRAM BY SUBMISSIONID
exports.getProgram = async (req, res) => {
  try {
    const submission = await Submissions.findById(req.body.submissionId);
    if (!submission) {
      return res.status(404).send(formatResponse(true, "Invalid submission!"));
    }
    const contest = await Contests.findById(submission.contest);
    const program = await Programs.findOne({ contestId: submission.contest });
    if (!contest) {
      return res.status(200).send(formatResponse(true, "Contest not found for the submission"));
    }
    if (!program) {
      return res.status(200).send(formatResponse(true, "Program not found for the submission"));
    }
    if (submission.status === "completed") {
      return res.status(200).send(formatResponse(true, "Submission details fetched successfully", {
        code: submission.submittedCode,
        testResults: submission.testResults,
        Program: program,
        Contest: contest
      }));
    }
    return res.status(200).send(formatResponse(false, "Program details fetched successfully", { Program: program, Contest: contest }));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};

//SUBMISSIONS
exports.createSubmission = async (req, res) => {
  try {
    const contest = await Contests.findById(req.body.contest);
    if (!contest) {
      return res.status(404).send(formatResponse(true, "Contest not found"));
    }
    const isSubmissionExist = await Submissions.findOne({ contest: contest._id });
    if (isSubmissionExist) {
      return res.status(200).send(formatResponse(false, "User already registered for the contest!", { submissionId: isSubmissionExist._id }));
    }
    const newSubmission = new Submissions({
      user: req.userId,
      contest: contest._id,
    });
    //to count the number of participants
    contest.participants=contest.participants+1;
    await contest.save();

    await newSubmission.save();
    return res.status(200).send(formatResponse(false, "New registration created", { submissionId: newSubmission._id }));
  } catch (error) {
    return res.status(500).send(formatResponse(true, error.message));
  }
};

//TO CHECK USER ALREADY REGISTERED FOR THE CONTEST
exports.alreadyRegistered = async (req, res) => {
  try {
    const isSubmissionExist = await Submissions.findOne({ contest: req.body.contest, user: req.userId });
    if (isSubmissionExist) {
      return res.status(200).send(formatResponse(false, "User already registered for the contest!"));
    }
    return res.status(200).send(formatResponse(false, "User not registered"));
  } catch (error) {
    res.status(500).send(formatResponse(true, error.message));
  }
};



// exports.compiler = async (req, res) => {
//     try {
//       const {content}=req.body
//       console.log(content)
//       var input = {
//         language: 'Solidity',
//         sources: {
//           'test.sol': {
//             content,
//           }
//         },
//         settings: {
//           outputSelection: {
//             '*': {
//               '*': ['*']
//             }
//           }
//         }
//       };
      
//       var output = JSON.parse(solc.compile(JSON.stringify(input)));
//       for (var contractName in output.contracts['test.sol']) {
//         console.log(
//           contractName +
//             ': ' +
//             output.contracts['test.sol'][contractName].evm.bytecode.object
//         );
//       }
//       res.status(200).send(output)
//     } catch (error) {
//       console.error("Error while compiling", error);
//       res.status(500).send({ message: error.message || "Internal Server Error" });
//     }
//   };
exports.leaderboard=async(req,res)=>{
    try {
       const contestID=req.query.id;
       const allSubmissions=await Submissions.find({contest:contestID,status:"completed"});
       if(allSubmissions.length>0)
        {
          let ranks=await rankSubmissions(allSubmissions,contestID);
          return res.send(formatResponse(false, "Leaderboard details fetched successfully",ranks));
        }
       return res.send(formatResponse(false,"No one submitted yet for the contest",[]))
    } catch (error) {
       res.status(500).send(formatResponse(true,error?.message));
    }
}
exports.getUserContestDetails=async(req,res)=>{
   try {
    const user=await Users.findOne({shardId:req.params.shardId});
    const allSubmissions=await Submissions.find({user:user._id});
      // Calculate the statistics
      const totalSubmissions = allSubmissions.length;
      const totalXpEarned = allSubmissions.reduce((acc, submission) => acc + (submission.xp || 0), 0);
      const totalAmountEarned = allSubmissions.reduce((acc, submission) => acc + (submission.amountEarned || 0), 0);
      const rank1Count = allSubmissions.filter(submission => submission.rank === 1).length;
      const badges=0;
      const response = {
         contestParticipated:totalSubmissions,
         contestWon:rank1Count,
         XPEarned:totalXpEarned,
         AmountEarned:totalAmountEarned,
         badges:badges
      };
      return res.status(200).send(formatResponse(false,"Success",response));
   } catch (error) {
      res.status(500).send(formatResponse(true,error?.message));
   }
}
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
      const {id:strapiId,title,description,participants,startDate,endDate,image,details,rules,warnings,level,prize,reward}=req.body.entry
      const mappedRules=req.body.entry.rules[0].children.map(child=>child.children[0].text)
      const mappedWarnings=req.body.entry.warnings[0].children.map(child=>child.children[0].text)
      const createdContest=new Contests({strapiId,title,description,participants,startDate,endDate,image:image.url,details,rules:mappedRules,warnings:mappedWarnings,level,prize,reward})
      await createdContest.save()
      console.log("WEBHOOK: NEW CONTEST ADDED")
    } catch (error) {
      console.log("Failed to save contest");
      return;
    }
  };

updateContest=async(req)=>{
    try {
      //  console.log("re-->",req.body.entry);
        const { id: strapiId, title, description, participants, startDate, endDate, image, details, rules, warnings, level,prize,reward } = req.body.entry;
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
          prize,
          reward
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
        console.log("WEBHOOK: CONTEST UPDATED")
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
     const {id:strapiId,contestid:strapiContestId,duration,boilerplate_code,description,test_cases}=req.body.entry;
     const contest=await Contests.findOne({strapiId:strapiContestId});
     if(!contest)
      {
        console.log("Contest not exist for the program");
        return ;
      }
     const mappedDescription=description[0].children.map(child=>child.children[0].text);
     const createdProgram=new Programs({strapiId,strapiContestId,contestId:contest._id,duration,boilerplate_code,description:mappedDescription,test_cases});
     await createdProgram.save();
     console.log("WEBHOOK: NEW PROGRAM ADDED");
  }
  catch(error)
  {
    console.log(error.message);
    console.log("Failed to save new program")
  }
}

updateProgram=async(req)=>{
  try {

      const {id:strapiId,contestid:strapiContestId,duration,boilerplate_code,description,test_cases}=req.body.entry;
      const mappedDescription=description[0].children.map(child=>child.children[0].text);
      const updateData = {
        duration,
        strapiContestId,
        boilerplate_code,
        description:mappedDescription,
        test_cases
      };
      const updatedProgram = await Programs.findOneAndUpdate(
        { strapiId: strapiId },
        updateData,
        { new: true, useFindAndModify: false } // new: true returns the updated document
      );
    
      if (!updatedProgram) {
        console.log("Update failed, program not found in db")
        return;
      }
      console.log("WEBHOOK: PROGRAM UPDATED")
      return;

  }
  catch(error)
  {
     console.log(error.message)
     console.log("Failed to update program");
  }
}
