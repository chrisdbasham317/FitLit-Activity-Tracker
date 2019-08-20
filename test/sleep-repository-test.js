const chai = require('chai');
const expect = chai.expect;

const data = require('../test/sleep-data-subset');
const SleepRepository = require('../src/Sleep-repository');

describe('SleepRepository', () => {
  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be able to recieve data', () => {
    const sleeper = new SleepRepository(data);

    expect(sleeper.sleepers[1]).to.deep.equal({
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    });
  });

  it('should find a user based on their id', () => {
    const sleeper = new SleepRepository(data);

    expect(sleeper.returnUserSleep(5)).to.deep.equal([data[4]]);
  });
});