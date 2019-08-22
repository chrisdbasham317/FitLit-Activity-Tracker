class Hydration {
  constructor(hydrationObj) {
    this.userInfo = hydrationObj;
  }

  sumArray(arr) {
    let total = arr.reduce((totalOunces, value) => {
      return totalOunces += value.numOunces;
    }, 0);
    return total;
  }

  findDateRange(passedDate) {
    let findDate = Date.parse(passedDate);
    let arr = [];
    let dateRange = this.userInfo.forEach((date) => {
      if ((Date.parse(date.date) >= findDate) && (Date.parse(date.date) <= findDate + 604800000)) {
        arr.push(date);
      }
    });
    return arr;
  }

  getAllTimeAvg() {
    let total = this.sumArray(this.userInfo);
    return Math.round((total / this.userInfo.length))
  }

  getOuncesByDate(passedDate) {
    let date = Date.parse(passedDate);
    let userDates = this.userInfo.filter(info => Date.parse(info.date) === date);
    let dateTotalOunces = this.sumArray(userDates);
    return dateTotalOunces;
  }

  getWeeklyOunces(passedDate) {
    let daysWithinRange = this.findDateRange(passedDate);
    let formattedInfo = daysWithinRange.map(elem => `You Drank ${this.getOuncesByDate(elem.date)} ounces on ${elem.date}`);
    let reducedInfo = formattedInfo.reduce((noDuplicates, elem) => noDuplicates.includes(elem) ? noDuplicates : [...noDuplicates, elem], []);
    return reducedInfo
  }
}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}