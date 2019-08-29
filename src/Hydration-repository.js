class HydrationRepository {
  constructor(hydrationData) {
    this.userHydration = hydrationData;
  }

  getUserHydration(userId) {
    let userData = this.userHydration.filter(user => user.userID === userId)
    return userData;
  }

  findDateRange(passedDate) {
    let findDate = Date.parse(passedDate);
    let arr = [];
    let dateRange = this.userHydration.forEach((entry) => {
      if ((Date.parse(entry.date) <= findDate) && (Date.parse(entry.date) >= findDate - 604800000)) {
        arr.push(entry);
      };
    });
    return arr;
  };

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

  getAvgOuncesWeek(passedDate) {
    let dateRange = this.findDateRange(passedDate);
    let hydrationArray = dateRange.map(elem => elem.numOunces);
    let totalHydration = this.sumArray(hydrationArray);
    let hydrationAvg = totalHydration / dateRange.length;
    return hydrationAvg.toFixed(2);
  }
}


if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}