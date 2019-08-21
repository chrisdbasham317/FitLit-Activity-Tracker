const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep');
const SleepRepository = require('../src/Sleep-repository');
const userData = require('../test/sleep-data-subset');
const userInfo = userData;

describe('Sleep', () => {

  let sleep, sleepRepository;

  beforeEach(() => {
    sleepRepository = new SleepRepository(userInfo);
    sleep = new Sleep(sleepRepository.returnUserSleep(2));
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be able to get the users data', () => {
    expect(sleep.data).to.deep.equal([userInfo[1], userInfo[2], userInfo[3]]);
  });

  it('should be able to calculate the daily amount of sleep', () => {
    expect(sleep.calculateDailySleep('2019/06/15')).to.equal(7);
  })

  it('should be able to calculate average time slept per day', () => {
    expect(sleep.calculateAverageSleep()).to.equal(8);
  });

  it('should be able to calculate the average sleep quality', () => {
    expect(sleep.calculateAverageSleepQual()).to.equal(4);
  });
})