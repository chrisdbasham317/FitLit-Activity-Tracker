const UserRepository = require('../src/user-repository.js');

class Activity {
  constructor(activityObj) {
    this.userActivity = activityObj;
  }

  sumActivty(arr) {
    let total = arr.reduce((totalActivity, currentActivity) => {
      return totalActivity += currentActivity;
    }, 0);
    return total;
  }

  getActivityTotal(passedDate, activity) {
    let date = Date.parse(passedDate);
    let thisDaysActivity = this.userActivity.filter(elem => Date.parse(elem.date) === date);
    let totalActivity = thisDaysActivity.map(elem => elem[activity]);
    return this.sumActivty(totalActivity);
  }

  getMilesWalkedDay(passedDate, activity, user) {
    let distanceWalked = this.getActivityTotal(passedDate, activity);
    return `${((distanceWalked * user.strideLength) / 5280).toFixed(2)}`;
  }

  getMinutesActiveDay(passedDate, activity) {
    let totalMinutes = this.getActivityTotal(passedDate, activity);
    return totalMinutes;
  }
}



if (typeof module !== 'undefined') {
  module.exports = Activity;
}