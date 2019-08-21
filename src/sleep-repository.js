const sleep = require('../src/Sleep');

class SleepRepository {
  constructor(data) {
    this.sleepers = data;
  }

  returnUserSleep(userId) {
    let foundUserSleep = this.sleepers.filter(sleeper => sleeper.userID === userId)
    return foundUserSleep;
  }

  calculateAverageSleepAll() {
    let totalSleepAll = this.sleepers.reduce((acc, person) => {
      return acc + person.hoursSlept
    }, 0);
    return totalSleepAll;
  }

  calculateAverageSleepQualAll() {
    let totalSleepQualAll = this.sleepers.reduce((acc, person) => {
      return acc + person.sleepQuality
    }, 0);
    return Math.round(totalSleepQualAll);
  }

  sleepQualOverThreeAll() {
    sleep.findDateRange('2019/06/15');
  }
}

module.exports = SleepRepository;