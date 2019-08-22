class HydrationRepository {
  constructor(hydrationData) {
    this.userHydration = hydrationData;
  }

  returnUserHydration(userId) {
    let userData = this.userHydration.filter(user => user.userID === userId)
    return userData;
  }
}


if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}