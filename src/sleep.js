class Sleep {
  constructor(userData) {
    this.data = userData;
  };

  calculateDailySleep(date) {
    let findDate = Date.parse(date);

    let dailySleep = this.data.find((data) => Date.parse(data.date) === findDate);

    return dailySleep.hoursSlept
  };

  calculateAverageSleep() {
    let counter = 0;
    let userSleep = this.data.map(data => data.hoursSlept);
    let totalSleep = userSleep.forEach(time => counter += time);
    let averageTotalSleep = Math.round(counter / userSleep.length)

    return averageTotalSleep;
  };

  calculateSleepOverWeek(startDay) {
    let weekSample = this.findDateRange(startDay);
    let averageSleep = weekSample.reduce((acc, day) => {
      return Math.round(acc + day.hoursSlept)
    }, 0);
   
    return averageSleep;
  };

  calculateAverageSleepQual() {
    let totalSleepQual = this.data.reduce((sleepQual, data) => {
      return sleepQual + data.sleepQuality; 
    }, 0);

    return Math.round(totalSleepQual / this.data.length);
  };

  calculateDailySleepQual(date) {
    let findDate = Date.parse(date);

    let dailySleepQual = this.data.find((data) => Date.parse(data.date) === findDate);

    return dailySleepQual.sleepQuality;
  };

  findDateRange(passedDate) {
    let findDate = Date.parse(passedDate);
    let arr = [];
    let dateRange = this.data.forEach((data) => {
    if((Date.parse(data.date) >= findDate) && (Date.parse(data.date) <= findDate + 604800000)) {
      arr.push(data);
    };
  });
    return arr;
  };

  calculateWeeklySleepQual(passedDate) {
    let range = this.findDateRange(passedDate);
    let averageSleepQual = range.reduce((acc, day) => {
      return acc + day.sleepQuality
    }, 0);
      return Math.round(averageSleepQual / range.length)
  };
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}