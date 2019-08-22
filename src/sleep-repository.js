class SleepRepository {
  constructor(data) {
    this.usersInfo = data;
  }

  findDateRange(passedDate) {
    let findDate = Date.parse(passedDate);
    let arr = [];
    let dateRange = this.usersInfo.forEach((data) => {
    if((Date.parse(data.date) >= findDate) && (Date.parse(data.date) <= findDate + 604800000)) {
      arr.push(data);
    };
  });
    return arr;
  };

  reduceArray(arr) {
    let reducedArr = arr.reduce((noDuplicates, elem) => noDuplicates.includes(elem) ? noDuplicates : [...noDuplicates, elem], []);
    return reducedArr
  }

  returnUserSleep(userId) {
    let foundUserSleep = this.usersInfo.filter(sleeper => sleeper.userID === userId)
    return foundUserSleep;
  }

  calculateAverageSleepAll() {
    let totalSleepAll = this.usersInfo.reduce((acc, person) => {
      return acc + person.hoursSlept
    }, 0);
    return totalSleepAll;
  }

  calculateAverageSleepQualAll() {
    let totalSleepQualAll = this.usersInfo.reduce((acc, person) => {
      return acc + person.sleepQuality
    }, 0);
    return Math.round(totalSleepQualAll);
  }

  sumArray(arr) {
    let num = 0
    let array = arr.reduce((acc, obj) => {
      let numQual = num += obj.sleepQuality;
      return {'userID': obj.userID, 'sleepQuality': numQual}
    }, []);
    return array;
  }

  getWeeklyQualAverage(passedDate) {
    let arr = [];
    let entriesWithinRange = this.findDateRange(passedDate);
    let getEntryIDs = entriesWithinRange.map(entry => entry.userID)

    let reducedIDs = this.reduceArray(getEntryIDs);
    let validUsers = reducedIDs.map(entry => {
      return entriesWithinRange.filter(elem => elem.userID === entry)
    })

    let average = validUsers.forEach((variable, index) => {
      let qualityObject = (this.sumArray(variable)) 
      arr.push(qualityObject);
      return arr;
    });

    let allValidUsersWithinRange = arr.filter(obj => obj.sleepQuality >= 3)

    return allValidUsersWithinRange;
  }

  findBestSleeper(date) {
    let usersAtDate = this.usersInfo.filter(user => Date.parse(user.date) === Date.parse(date));

    let userHours = usersAtDate.map(user => user.hoursSlept)

    let maxHours = Math.max(...userHours);

    let bestSleeper = usersAtDate.filter(user => user.hoursSlept === maxHours)

    return bestSleeper;
  }
}

module.exports = SleepRepository;