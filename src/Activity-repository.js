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

  findDateRange(passedDate) {
    let findDate = Date.parse(passedDate);
    let arr = [];
    let dateRange = this.usersData.forEach((activity) => {
      if ((Date.parse(activity.date) <= findDate) && (Date.parse(activity.date) >= findDate - 604800000)) {
        arr.push(activity);
      };
    });
    return arr;
  };

  getAvgActivity(passedDate, activity) {
    let date = Date.parse(passedDate)
    let thisDaysActivity = this.usersData.filter(elem => Date.parse(elem.date) === date);
    let totalActivity = thisDaysActivity.map(elem => elem[activity]);
    let avgActivity = this.sumArray(totalActivity) / totalActivity.length;
    return avgActivity.toFixed(2);
  }

  getAvgActivityWeekly(passedDate, activity) {
    let thisWeeksActivity = this.findDateRange(passedDate);
    let totalActivity = thisWeeksActivity.map(elem => elem[activity]);
    let avgActivity = this.sumArray(totalActivity) / totalActivity.length;
    return avgActivity.toFixed(2)
  }
  
}



if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}  