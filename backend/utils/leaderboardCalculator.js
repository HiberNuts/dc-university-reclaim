const db = require('../models');
const User = db.user;
const Contest = db.Contests;
const Submission=db.Submissions;
exports.generateLeaderboardFunction = async (submissions, contestID) => {
  submissions.sort((a, b) => {
    const timeA = new Date(a.submittedTime);
    const timeB = new Date(b.submittedTime);
    if (timeA - timeB !== 0) {
      return timeA - timeB;
    }
    return b.xp - a.xp;
  });

  const contest = await Contest.findById(contestID);
  const rewards = contest?.reward || [];

   await Promise.all(
    submissions.map(async (submission, index) => {
      // Find prize for the current rank
      const prizeForTheRank = rewards.find(reward => reward.rank === index + 1)?.prize || '0';
      // Update the rank and amountEarned fields in the submission document
      await Submission.findByIdAndUpdate(submission._id, { 
            rank: index + 1,
            amountEarned: prizeForTheRank
        }, { new: true });
    })
  );
  contest.leaderboard=true;
  await contest.save();
  console.log("Leaderboard generated for contest: ",contest._id);
  return {error:false,message:"Leaderboard generated successfully"};
};

exports.getLeaderboard = async (submissions) => {
  // Sort submissions based on rank
  submissions.sort((a, b) => a.rank - b.rank);

  const rankedSubmissions = await Promise.all(
    submissions.map(async (submission) => {
      const user = await User.findById(submission.user);

      return {
        "Rank": submission.rank,
        // userID: submission.user,
        "Avatar": user?.image ?? 'https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/9aa80aa64a524e6477fb757e287fba19.avif',
        "User Name": user ? user.username : 'Unknown',
        "XP": submission.xp,
        "Amount Earned": "$ "+submission.amountEarned
      };
    })
  );

  return rankedSubmissions;
};
// exports.rankSubmissions = async (submissions, contestID) => {
//   submissions.sort((a, b) => {
//     const timeA = new Date(a.submittedTime);
//     const timeB = new Date(b.submittedTime);
//     if (timeA - timeB !== 0) {
//       return timeA - timeB;
//     }
//     return b.xp - a.xp;
//   });

//   const contest = await Contest.findById(contestID);
//   const rewards = contest?.reward || [];

//   const rankedSubmissions = await Promise.all(
//     submissions.map(async (submission, index) => {
//       const user = await User.findById(submission.user);

//       // Find prize for the current rank
//       const prize = rewards.find(reward => reward.rank === index + 1)?.prize || '-';
//       // Update the rank and amountEarned fields in the submission document
//       await Submission.findByIdAndUpdate(submission._id, { 
//             rank: index + 1,
//             prize: prize
//         }, { new: true });

//       return {
//         "Rank": index + 1,
//         // userID: submission.user,
//         "Avatar": user?.image ?? 'https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/9aa80aa64a524e6477fb757e287fba19.avif',
//         "User Name": user ? user.username : 'Unknown',
//         "XP": submission.xp,
//         "Prize":prize
//       };
//     })
//   );

//   return rankedSubmissions;
// };