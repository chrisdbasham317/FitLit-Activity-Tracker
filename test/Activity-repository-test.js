const chai = require('chai');
const expect = chai.expect;

const data = require('../test/Activity-data-subset');
const ActivityRepository = require('../src/Activity-repository');

describe('ActivityRepository', () => {
  it('should store all the user\'s activity data', () => {
    const activityRepository = new ActivityRepository(data);
    expect(activityRepository.usersData).to.equal(data)
  })

  it('should be able to return a specific user\'s data by ID', () => {
    const activityRepository = new ActivityRepository(data);
    expect(activityRepository.returnUserActivityByID(1)).to.deep.equal([{ userID: 1, date: '2019/06/15', numSteps: 3577, minutesActive: 140, flightsOfStairs: 16 }, { userID: 1, date: '2019/06/16', numSteps: 4294, minutesActive: 138, flightsOfStairs: 10}])
  })

  it('should be able to return the average stairs climbed for all users by date', () => {
    const activityRepository = new ActivityRepository(data);
    expect(activityRepository.getAvgActivity('2019/06/15', 'flightsOfStairs')).to.equal('21.14')
  })

  it('should be able to return the average steps taken for all users by date', () => {
    const activityRepository = new ActivityRepository(data);
    expect(activityRepository.getAvgActivity('2019/06/15', 'numSteps')).to.equal('7659.43')
  })

  it('should be able to return the average minutes active for all users by date', () => {
    const activityRepository = new ActivityRepository(data);
    expect(activityRepository.getAvgActivity('2019/06/15', 'minutesActive')).to.equal('155.86')
  })

  it('should be able to return average weekly activity for all users', () => {
    const activityRepository = new ActivityRepository(data);
    expect(activityRepository.getAvgActivityWeekly('2019/06/16', 'minutesActive')).to.equal('153.63')
    expect(activityRepository.getAvgActivityWeekly('2019/06/16', 'numSteps')).to.equal('7238.75')
    expect(activityRepository.getAvgActivityWeekly('2019/06/16', 'flightsOfStairs')).to.equal('19.75')
  })
    
})