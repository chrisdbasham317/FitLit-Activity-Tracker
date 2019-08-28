class UserRepository {
  constructor(data) {
    this.users = data;
  }
  returnUser(userId) {
    let foundUser = this.users.find(user => user.id === userId)
    return foundUser
  }

  calculateStepGoal() {
    let stepGoal = this.users.reduce((sum, currentUser) => {
      return sum += currentUser.dailyStepGoal
    }, 0)
    return stepGoal / this.users.length
  }

}


if (typeof module !== 'undefined') {
  module.exports = UserRepository
}