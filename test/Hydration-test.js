const chai = require('chai');
const expect = chai.expect;

const data = require('../test/hydration-data-subset');
const HydrationRepository = require('../src/Hydration-repository')
const Hydration = require('../src/Hydration');

describe('Hydration', () => {
  it('should have an id, date,and ounces drank', () => {
    const hydrationRepository = new HydrationRepository(data);
    const userHydration = hydrationRepository.returnUserHydration(1);
    const hydration = new Hydration(userHydration);
    expect(hydration.userInfo[0].userID).to.equal(1);
    expect(hydration.userInfo[0].date).to.equal('2019/06/15');
    expect(hydration.userInfo[0].numOunces).to.equal(37);
  })

  it('should return the user\'s average water consumed from all time', () => {
    const hydrationRepository = new HydrationRepository(data);
    const userHydration = hydrationRepository.returnUserHydration(1);
    const hydration = new Hydration(userHydration);
    expect(hydration.getAllTimeAvg()).to.equal(56);
  })

  it('should return the user\'s ounces drank for any date', () => {
    const hydrationRepository = new HydrationRepository(data);
    const userHydration = hydrationRepository.returnUserHydration(1);
    const hydration = new Hydration(userHydration);
    expect(hydration.getOuncesByDate('06/15/2019')).to.equal(112);
  })

  it('should return water consumed each day over a week', () => {
    const hydrationRepository = new HydrationRepository(data);
    const userHydration = hydrationRepository.returnUserHydration(1);
    const hydration = new Hydration(userHydration);
    expect(hydration.getWeeklyOunces('06/15/2019')).to.deep.equal(['You Drank 112 ounces on 2019/06/15', 'You Drank 69 ounces on 2019/06/16']);
  })
})
