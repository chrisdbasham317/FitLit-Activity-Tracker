class Challenges {
constructor(user, activity) {
    this.userFriends = user.friends;
    this.activity = activity;
  }

  findFriends() {
    return this.userFriends
  }

  findFriendsActivity() {
    return this.activity.usersData.filter(user => this.findFriends().includes(user.userID));
  }

  weekFriendActivity(date) {
    let findDate = Date.parse(date);
    let arr = [];
    let dateRange = this.findFriendsActivity().forEach((range) => {
      if((Date.parse(range.date) >= findDate) && (Date.parse(range.date) <= findDate + 604800000)) {
        arr.push(range);
      }
    })
    return arr
  }

  averageFriendStepCount(date) {
    let friendActivityInRange = this.weekFriendActivity(date);
    let arr = [];
    let friendsIDs = this.findFriends();
    let validFriendsIDs = friendActivityInRange.forEach((friend) => {
      if(friendsIDs.includes(friend.userID) && !arr.includes(friend.userID)) {
        arr.push(friend.userID)
      }
    });
    let bestFriends = []
    let uniqueIDs = arr.reduce((acc, id) => {
      let counter = 0;
      friendActivityInRange.forEach((friendInRange) => {
        if(friendInRange.userID === id) {
          counter += friendInRange.numSteps;
        }
      });
      bestFriends.push({'userID': id, 'numSteps': counter})
    }, [])
    return bestFriends.sort((a, b) => b.numSteps - a.numSteps);
  }

  increasingSteps(id) {
    let oneUser = this.activity.usersData.filter((user) => user.userID === id);
    let arr = [];
    let dateArr = oneUser.forEach(user => arr.push({'userID': user.userID, 'date': Date.parse(user.date), 'numSteps': user.numSteps}))
    let sortedByDate = arr.sort((a,b) => {
     return b.date - a.date
    })
    return sortedByDate
  }

  stepTrend(id) {
    let daysSortedByDate = this.increasingSteps(id)
    let trend = daysSortedByDate.reduce((acc, day, index) => {
      if(index === 0) {
        acc.push(day);
      }
      if(index > 0 && daysSortedByDate[index - 1].numSteps > day.numSteps) {
        acc.push(day);
      }
      return acc;
    }, []);
    return trend;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Challenges;
}