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

  findDateRange(passedDate) {
    let findDate = Date.parse(passedDate);
    let arr = [];
    let dateRange = this.userActivity.forEach((activity) => {
      if ((Date.parse(activity.date) >= findDate) && (Date.parse(activity.date) <= findDate + 604800000)) {
        arr.push(activity);
      };
    });
    return arr;
  };

  getMilesWalkedDay(passedDate, activity, user) {
    let distanceWalked = this.getActivityTotal(passedDate, activity);
    return `${((distanceWalked * user.strideLength) / 5280).toFixed(2)}`;
  }

  getMinutesActiveDay(passedDate, activity) {
    let totalMinutes = this.getActivityTotal(passedDate, activity);
    return totalMinutes;
  }

  getMinutesActiveWeek(passedDate, activity) {
    let dateRangeObjs = this.findDateRange(passedDate);
    let weeksMinutes = dateRangeObjs.map(elem => elem[activity]);
    let avgActivity = this.sumActivty(weeksMinutes) / 7;
    return avgActivity.toFixed(2);
  }

  returnStepGoalMet(passedDate, userStepGoal) {
    let date = Date.parse(passedDate);
    let todaysLogs = this.userActivity.filter(elem => Date.parse(elem.date) === date);
    let todaysSteps = todaysLogs.map(elem => elem['numSteps']);
    let totalSteps = this.sumActivty(todaysSteps);
    return totalSteps >= userStepGoal ? true : false;
  }

  returnAllMetStepGoals(userStepGoal) {
    let metGoals = this.userActivity.filter(day => day.numSteps >= userStepGoal);
    let daysMet = metGoals.map(entry => entry.date);
    return metGoals.length > 0 ? daysMet : "You haven't reached your step goal yet, Keep Striving For It!";
  }

  getMostStairsClimbed() {
    let stairLogs = this.userActivity.map(log => log.flightsOfStairs);
    let sortedLogs = stairLogs.sort((stairs1, stairs2) => stairs1 - stairs2);
    return sortedLogs.pop();
  }
}



if (typeof module !== 'undefined') {
  module.exports = Activity;
}