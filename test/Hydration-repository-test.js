const chai = require('chai');
const expect = chai.expect;

const data = require('../test/Hydration-data-subset');
const HydrationRepository = require('../src/Hydration-repository');

describe('HydrationRepository', () => {
  it('should store all user\'s hydration data', () => {
    const hydrationRepository = new HydrationRepository(data);
    expect(hydrationRepository.userHydration).to.equal(data);
  })

  it('should be able to return hydration data by user id', () => {
    const hydrationRepository = new HydrationRepository(data);
    expect(hydrationRepository.returnUserHydration(1)).to.have.lengthOf(3)
  })

  it('should be able to return the average water intake for all users on a given day', () => {
    const hydrationRepository = new HydrationRepository(data);
    expect(hydrationRepository.getAvgOunces("2019/06/15")).to.equal(57.2);
  })
})