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

    expect(sleepRepository.sleepers[1]).to.deep.equal({
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    });
  });

  it('should find a user based on their id', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.returnUserSleep(5)).to.deep.equal([data[4]]);
  });

  it('should be able to calculate the average sleep of all users', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.calculateAverageSleepAll()).to.equal(33.4);
  });

  it('should be able to calculate the average sleep quality of all users', () => {
    const sleepRepository = new SleepRepository(data);

    expect(sleepRepository.calculateAverageSleepQualAll()).to.equal(18)
  });

  it('should be able to calculate the average sleep quality greater than three for all users', () => {
    const sleepRepository = new SleepRepository(data);
    const sleep = new Sleep(sleepRepository.returnUserSleep(2));

    sleepRepository.sleepQualOverThreeAll();
    // expect(sleepRepository.sleepQualOverThreeAll()).to.equal();
  })
});