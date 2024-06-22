const db = require('../models');
const User = db.user;
const Contest = db.Contests;

exports.rankSubmissions = async (submissions, contestID) => {
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

  const rankedSubmissions = await Promise.all(
    submissions.map(async (submission, index) => {
      const user = await User.findById(submission.user);

      // Find prize for the current rank
      const prize = rewards.find(reward => reward.rank === index + 1)?.prize || '-';

      return {
        "Rank": index + 1,
        // userID: submission.user,
        "Avatar": user?.image ?? 'https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/9aa80aa64a524e6477fb757e287fba19.avif',
        "User Name": user ? user.username : 'Unknown',
        "XP": submission.xp,
        "Prize":prize
      };
    })
  );

  return rankedSubmissions;
};
