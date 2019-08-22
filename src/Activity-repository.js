class ActivityRepository {
  constructor(data) {
    this.usersData = data;
  }

  returnUserActivityByID(userId) {
    let userData = this.usersData.filter(user => user.userID === userId)
    return userData;
  }

  sumArray(arr) {
    let total = arr.reduce((totalActivity, currentActivity) => {
      return totalActivity += currentActivity;
    }, 0);
    return total;
  } 

  getAvgActivity(passedDate, activity) {
    let date = Date.parse(passedDate)
    let thisDaysActivity = this.usersData.filter(elem => Date.parse(elem.date) === date);
    let totalActivity = thisDaysActivity.map(elem => elem[activity]);
    return this.sumArray(totalActivity) / totalActivity.length;
  }
  
}




module.exports = ActivityRepository