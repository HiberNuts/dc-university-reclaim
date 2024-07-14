const db = require("../models");
const Users = db.user;
const Contests = db.Contests;
const Programs = db.Programs;
const Submissions = db.Submissions;
const { getLeaderboard,generateLeaderboardFunction } = require('../utils/leaderboardCalculator')
const { formatResponse } = require('../utils/formatResponse');
const { mapRichTextNodesToSchema } = require('../utils/mapRichText')
//LATEST CONTEST
exports.getLatestContest = async (req, res) => {
  try {
    const today = new Date();
    const latestContest = await Contests.findOne({ softDelete:false,endDate: { $gte: today } }).sort({ endDate: 1 });
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
      softDelete:false,
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

//GET PAST CONTESTS WITH PAGIANTION
exports.getPastContests = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query; // Default to page 1 and limit 10 if not provided
    const today = new Date().toISOString();

    const totalItems = await Contests.countDocuments({softDelete:false, endDate: { $lt: today } });
    const pastContests = await Contests.find({
      softDelete:false,
      endDate: { $lt: today }
    })
      .sort({ endDate: -1, _id: 1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (pastContests.length === 0) {
      return res.status(404).send(formatResponse(true, "No past contests found"));
    }

    res.status(200).send(formatResponse(false, "Past contests fetched successfully", {
      pastContests,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page)
    }));
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
//GET SOLUTION
exports.getSolution=async(req,res)=>{
   try {
    const contest=await Contests.findOne({title:req.query.title});
    if(!contest)
       return res.status(200).send(formatResponse(true,"Contest not found!")) ; 
    // Get the current date and time
    const now = new Date();
    if(now>contest.endDate)
      {
      const program=await Programs.findOne({contestId:contest._id});
        if(!program)  
          return res.status(200).send(formatResponse(true,"Program not found!")) ;
      return res.status(200).send(formatResponse(false,"Solution retrieved",{program:program,contest:contest})); 
      }  
    return res.status(200).send(formatResponse(true,"Solution is not yet published!"));
   } catch (error) {
       return res.status(500).send(formatResponse(true,"Internal Server Error"));
   }
}
//SUBMISSIONS
exports.createSubmission = async (req, res) => {
  try {
    const contest = await Contests.findById(req.body.contest);
    if (!contest) {
      return res.status(404).send(formatResponse(true, "Contest not found"));
    }
    // Get the current date and time
    const now = new Date();
    // Check if the current date and time is within the contest's start and end date
    if (now < contest.startDate || now > contest.endDate) {
      return res.status(200).send(formatResponse(true, "The contest is not active at this time"));
    }
    const isSubmissionExist = await Submissions.findOne({ contest: contest._id,user:req.userId });
    if (isSubmissionExist) {
      return res.status(200).send(formatResponse(false, "User already registered for the contest!", { submissionId: isSubmissionExist._id }));
    }
    const newSubmission = new Submissions({
      user: req.userId,
      contest: contest._id,
    });
    //to count the number of participants
    contest.participants = contest.participants + 1;
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

//ADMIN PANEL ROUTES
exports.getSubmissionByContest = async (req, res) => {
  try {
    const submissions = await Submissions.find({ contest: req.body.contestId });
  
    const users = await Users.find()
    const userCompletedSubmission=submissions.map(submission=>{
      const {username,shardId='NA',walletAddress}=users.find(user=>user._id.toHexString()==submission.user.toHexString())
      const {totalCases='NA',passedCases='NA',xp='NA',rank,submittedTime='NA'}=submission
      return {
          rank,
          username,
          shardId,
          totalCases,
          passedCases,
          submittedTime,
          xp,
          walletAddress
      }
    }).sort((a, b) => a.rank - b.rank)
    return res.status(200).send(userCompletedSubmission)
  } catch (error) {
    console.log(error)
    res.status(500).send(error);

  }
};
//SOFT DELETE A CONTEST
exports.deleteAContest=async(req,res)=>{
   try {
      const contestId=await Contests.findById(req.query.id);
      if(!contestId)
         return res.status(200).send(formatResponse(true,"Contest not exist in DB"));
      if(contestId.softDelete==true)
        return res.status(200).send(formatResponse(true,"Contest already soft deleted!"));
      contestId.softDelete=true;
      await contestId.save();
      return res.status(200).send(formatResponse(false,"Contest is soft deleted."))  
   } catch (error) {
      return res.status(500).send(formatResponse(true,error.message));
   }
}




//LEADERT BOARD
exports.generateLeaderboard=async(req,res)=>{
  try {
    const contestID=req.query.id;
    const allSubmissions = await Submissions.find({
      contest: contestID,
      status: "completed",
    });
       if(allSubmissions.length>0)
        {
         let resp=await generateLeaderboardFunction(allSubmissions,contestID);
         if(resp.error==false)
          return res.status(200).send(formatResponse(false,resp.message));
        else
          return res.status(200).send(formatResponse(true,resp.message));
        }
       return res.send(formatResponse(false,"No one submitted yet for the contest",[]))
  } catch (error) {
     res.status(500).send(formatResponse(true,error?.message));
  }
}
exports.leaderboard=async(req,res)=>{
    try {
       const contestID=req.query.id;
       const allSubmissions = await Submissions.find({
        contest: contestID,
        status: "completed",
        rank: { $ne: -1 }
      });      
       if(allSubmissions.length>0)
        {
          let ranks=await getLeaderboard(allSubmissions);
          return res.send(formatResponse(false, "Leaderboard details fetched successfully",ranks));
        }
       return res.send(formatResponse(false,"No one submitted yet for the contest",[]))
    } catch (error) {
       res.status(500).send(formatResponse(true,error?.message));
    }
}
exports.getUserContestDetails = async (req, res) => {
  try {
    const user = await Users.findOne({ shardId: req.params.shardId });
    const allSubmissions = await Submissions.find({ user: user._id });
    // Calculate the statistics
    const totalSubmissions = allSubmissions.length;
    const totalXpEarned = allSubmissions.reduce((acc, submission) => acc + (submission.xp || 0), 0);
    const totalAmountEarned = allSubmissions.reduce((acc, submission) => acc + (parseInt(submission.amountEarned) || 0), 0);
    const rank1Count = allSubmissions.filter(submission => submission.rank === 1).length;
    const badges = 0;
    const response = {
      contestParticipated: totalSubmissions,
      contestWon: rank1Count,
      XPEarned: totalXpEarned,
      AmountEarned: totalAmountEarned,
      badges: badges
    };
    return res.status(200).send(formatResponse(false, "Success", response));
  } catch (error) {
    res.status(500).send(formatResponse(true, error?.message));
  }
}
//WEBHOOKS
exports.createModel = async (req, res) => {
  try {
    if (req.body.model == 'contest')
      await createContest(req)
    if (req.body.model == "program")
      await createProgram(req)
    res.status(200).send(createdContest)
  }
  catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}

exports.updateModel = async (req, res) => {
  try {
    if (req.body.model == 'contest')
      await updateContest(req)
    if (req.body.model == "program")
      await updateProgram(req)
    res.status(200).send({ error: false, message: "Entry updated in db" })
  }
  catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}


const createContest = async (req) => {
  try {
    const {
      id: strapiId = null,
      title = '',
      description = '',
      participants = 0,
      startDate = null,
      endDate = null,
      image = { url: '' },
      details = '',
      rules = [],
      warnings = [],
      level = 'Easy',
      prize = '',
      reward = []
    } = req.body.entry;


    const mappedRules = rules[0]?.children ? mapRichTextNodesToSchema(rules[0].children) : '';
    const mappedWarnings = warnings[0]?.children ? mapRichTextNodesToSchema(warnings[0].children) : '';

    const createdContest = new Contests({
      strapiId,
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
    });

    await createdContest.save();
    console.log("WEBHOOK: NEW CONTEST ADDED");
  } catch (error) {
    console.log("Failed to save contest:", error.message);
    return;
  }
};

const updateContest = async (req) => {
  try {
    const {
      id: strapiId = null,
      title = '',
      description = '',
      participants = 0,
      startDate = null,
      endDate = null,
      image = { url: '' },
      details = '',
      rules = [],
      warnings = [],
      level = 'Easy',
      prize = '',
      reward = []
    } = req.body.entry;

    const mappedRules = rules[0]?.children ? mapRichTextNodesToSchema(rules[0].children) : '';
    const mappedWarnings = warnings[0]?.children ? mapRichTextNodesToSchema(warnings[0].children) : '';
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
      { strapiId },
      updateData,
      { new: true, useFindAndModify: false }
    );

    if (!updatedContest) {
      console.log("Contest failed to update because not found in db");
      return;
    }
    console.log("WEBHOOK: CONTEST UPDATED");
  } catch (error) {
    console.log("Failed to update contest:", error.message);
  }
};

const createProgram = async (req) => {
  try {
    const {
      id: strapiId = null,
      contestid: strapiContestId = '',
      duration = '',
      boilerplate_code = '',
      description = [],
      test_cases = [],
      test_file_content='',
      solution=''
    } = req.body.entry;

    const contest = await Contests.findOne({ strapiId: strapiContestId });
    if (!contest) {
      console.log("Contest does not exist for the program");
      return;
    }

    const mappedDescription = description[0]?.children ? mapRichTextNodesToSchema(description[0].children) : '';

    const createdProgram = new Programs({
      strapiId,
      strapiContestId,
      contestId: contest._id,
      duration,
      boilerplate_code,
      description: mappedDescription,
      test_cases,
      test_file_content,
      solution
    });

    await createdProgram.save();
    console.log("WEBHOOK: NEW PROGRAM ADDED");
  } catch (error) {
    console.log("Failed to save new program:", error.message);
  }
};


const updateProgram = async (req) => {
  try {
    const {
      id: strapiId = null,
      contestid: strapiContestId = '',
      duration = '',
      boilerplate_code = '',
      description = [],
      test_cases = [],
      test_file_content='',
      solution=''
    } = req.body.entry;
    const mappedDescription = description[0]?.children ? mapRichTextNodesToSchema(description[0].children) : '';

    const updateData = {
      duration,
      strapiContestId,
      boilerplate_code,
      description: mappedDescription,
      test_cases,
      test_file_content,
      solution
    };

    const updatedProgram = await Programs.findOneAndUpdate(
      { strapiId },
      updateData,
      { new: true, useFindAndModify: false }
    );

    if (!updatedProgram) {
      console.log("Update failed, program not found in db");
      return;
    }
    console.log("WEBHOOK: PROGRAM UPDATED");
  } catch (error) {
    console.log("Failed to update program:", error.message);
  }
};

