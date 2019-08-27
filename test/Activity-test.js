const chai = require('chai');
const expect = chai.expect;

const userData = require('../test/user-data-subset');
const data = require('../test/Activity-data-subset');
const UserRepository = require('../src/user-repository');
const User = require('../src/user');
const ActivityRepository = require('../src/Activity-repository');
const Activity = require('../src/Activity');

describe('Activity', () => {

  let activityRepository, userActivity, userRepository, userByID, user, activity;

  beforeEach(() => {
    activityRepository = new ActivityRepository(data)
    userActivity = activityRepository.returnUserActivityByID(1);
    userRepository = new UserRepository(userData);
    userByID = userRepository.returnUser(1);
    user = new User(userByID);
    activity = new Activity(userActivity);
  });
  
  it('should return a user\'s miles walked by date', () => {
    expect(activity.getMilesWalkedDay('2019/06/15', 'numSteps', user)).to.equal('2.91');
  })

  it('should return user\'s minutes active on a given day', () => {
    expect(activity.getMinutesActiveDay('2019/06/15', 'minutesActive')).to.equal(140);
  })

  it('should return average minutes active for a given week', () => {
    expect(activity.getMinutesActiveWeek('2019/06/15', 'minutesActive')).to.equal('39.71');
  })

  it('should tell a user if they reached their step goal on a given date', () => {
    expect(activity.returnStepGoalMet('2019/06/15', user.dailyStepGoal)).to.equal(false);
  })

  it('should return all the days where a user met their step goal', () => {
    expect(activity.returnAllMetStepGoals(user.dailyStepGoal)).to.equal("You haven't reached your step goal yet, Keep Striving For It!");
    expect(activity.returnAllMetStepGoals(2500)).to.deep.equal(['2019/06/15', '2019/06/16'])
  })

  it('should return the user\'s most stairs climbed record', () => {
    expect(activity.getMostStairsClimbed()).to.equal(16);
  })
})