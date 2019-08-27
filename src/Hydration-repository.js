class HydrationRepository {
  constructor(hydrationData) {
    this.userHydration = hydrationData;
  }

  returnUserHydration(userId) {
    let userData = this.userHydration.filter(user => user.userID === userId)
    return userData;
  }

  sumArray(arr) {
    let total = arr.reduce((totalActivity, currentActivity) => {
      return totalActivity += currentActivity;
    }, 0);
    return total;
  }

  getAvgOunces(passedDate) {
    let date = Date.parse(passedDate)
    let thisDaysHydration = this.userHydration.filter(elem => Date.parse(elem.date) === date);
    let totalHydration = thisDaysHydration.map(elem => elem.numOunces);
    return this.sumArray(totalHydration) / totalHydration.length;
  }
}


if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}