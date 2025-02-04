const chai = require('chai');
const expect = chai.expect;

const data = require('../test/sleep-data-subset');
const Sleep = require('../src/Sleep');
const SleepRepository = require('../src/Sleep-repository');

describe('SleepRepository', () => {
  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be able to recieve data', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.usersInfo[1]).to.deep.equal({
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    });
  });

  it('should find a user based on their id', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.returnUserSleep(5)).to.deep.equal([data[5]]);
  });

  it('should be able to calculate the average sleep of all users', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.calculateAverageSleepAll()).to.equal(38.8);
  });

  it('should be able to calculate the average sleep quality of all users', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.calculateAverageSleepQualAll()).to.equal(21)
  });

  it('should be able to calculate the average sleep quality greater than three for all users', () => {
    const sleepRepository = new SleepRepository(data);
    const sleep = new Sleep(sleepRepository.returnUserSleep(2));

    expect(sleepRepository.getWeeklyQualAverage('2019/06/16')).to.deep.equal([{ userID: 2, sleepQuality: 9.4 }]);
  })

  it('should be able to find the best sleeper given a certain date', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.findBestSleeper('2019/06/23')).to.deep.equal([{
      "userID": 19,
      "date": "2019/06/23",
      "hoursSlept": 5.4,
      "sleepQuality": 2.5
    }]);
  })

  it('should return the average time slept for all users on a given day', () => {
    const sleepRepository = new SleepRepository(data);
    expect(sleepRepository.calcAverageSleepAllDaily("2019/06/23")).to.equal('4.75');
  })

  it('should return the average time slept for all users for a given week', () => {
    const sleepRepository = new SleepRepository(data);
    expect(sleepRepository.getAvgSleepAllWeek("2019/06/23")).to.equal('6.43');
  })
});