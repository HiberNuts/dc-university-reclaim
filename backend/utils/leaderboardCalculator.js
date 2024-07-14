const db = require('../models');
const User = db.user;
const Contest = db.Contests;
const Submission=db.Submissions;
exports.generateLeaderboardFunction = async (submissions, contestID) => {
  try {
    // First, sort submissions by XP and then by submission time
    submissions.sort((a, b) => {
      if (b.xp !== a.xp) {
        return b.xp - a.xp; // Sort by XP in descending order
      } else {
        const timeA = new Date(a.submittedTime);
        const timeB = new Date(b.submittedTime);
        return timeA - timeB; // If XP is the same, sort by submission time in ascending order
      }
    });

    const contest = await Contest.findById(contestID);
    const rewards = contest?.reward || [];

    // Assign ranks based on the sorted submissions
    await Promise.all(
      submissions.map(async (submission, index) => {
        const prizeForTheRank = rewards.find(reward => reward.rank === index + 1)?.prize || '0';
        await Submission.findByIdAndUpdate(submission._id, {
          rank: index + 1,
          amountEarned: prizeForTheRank
        }, { new: true });
      })
    );

    contest.leaderboard = true;
    await contest.save();
    console.log("Leaderboard generated for contest: ", contest._id);
    return { error: false, message: "Leaderboard generated successfully" };
  } catch (error) {
    console.log("LEADERBOARD GENERATE ERROR:", error.message);
    return { error: true, message: "Failed to generate Leaderboard" };
  }
};


exports.getLeaderboard = async (submissions) => {
  // Sort submissions based on rank
  submissions.sort((a, b) => a.rank - b.rank);

  const rankedSubmissions = await Promise.all(
    submissions.map(async (submission) => {
      const user = await User.findById(submission.user);

      return {
        Rank: submission.rank,
        // userID: submission.user,
        "Avatar": user?.image ?? 'https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/9aa80aa64a524e6477fb757e287fba19.avif',
        "User Name": user ? user.shardId : 'Unknown',
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