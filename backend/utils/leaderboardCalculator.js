// Function to sort and rank submissions
exports.rankSubmissions=(submissions)=> {
    // Sort submissions by submittedTime (ascending) and xp (descending)
    submissions.sort((a, b) => {
      const timeA = new Date(a.submittedTime);
      const timeB = new Date(b.submittedTime);
      if (timeA - timeB !== 0) {
        return timeA - timeB;
      }
      return b.xp - a.xp;
    });
  
    // Map the sorted submissions to the desired format with rank
    return submissions.map((submission, index) => ({
      rank: index + 1,
      userID: submission.user,
      xp: submission.xp
    }));
  }