const chai = require('chai');
const expect = chai.expect;

const userData = require('../test/user-data-subset');
const activityData = require('../test/Activity-data-subset');
const ActivityRepository = require('../src/Activity-repository');
const UserRepository = require('../src/user-repository');
const User = require('../src/user');
const Challenges = require('../src/challenges')

describe('Challenges', () => {

  let user, userRepository, activityRepo, challenges;

  beforeEach(() => {
    user = new User(userData);
    userRepository = new UserRepository(userData);
    activityRepo = new ActivityRepository(activityData);
    challenges = new Challenges(userRepository.returnUser(2), activityRepo);
  });

  it('should be able to return a users friends', () => {
    expect(challenges.findFriends()).to.deep.equal([9, 18, 24, 19]);
  });

  it('should be able to find the users friends in the activity data', () => {
    expect(challenges.findFriendsActivity()).to.deep.equal([{ userID: 9, date: '2019/06/13', numSteps: 12501, minutesActive: 160, flightsOfStairs: 11
    }]);
  });

  it('should be able to narrow that data to a week', () => {
    expect(challenges.weekFriendActivity('2019/06/13')).to.deep.equal([{ userID: 9, date: '2019/06/13', numSteps: 12501, minutesActive: 160, flightsOfStairs: 11
    }]);
  });

    it('should be able to average each friends step count', () => {
      expect(challenges.averageFriendStepCount('2019/06/13')).to.deep.equal([{ userID: 9, numSteps: 12501 }]);
  });

  it('should be able to sort a users data by date', () => {
    expect(challenges.increasingSteps(1)).to.deep.equal([{ userID: 1, date: 1560751200000, numSteps: 7402 },{ userID: 1, date: 1560664800000, numSteps: 4294 },{ userID: 1, date: 1560578400000, numSteps: 3577 }]);
  });

  it('should be able to determine if the step count is increasing over a three day section', () => {
    expect(challenges.stepTrend(1)).to.deep.equal([{ userID: 1, date: 1560751200000, numSteps: 7402 }, { userID: 1, date: 1560664800000, numSteps: 4294 }, { userID: 1, date: 1560578400000, numSteps: 3577 }]);
  });
});