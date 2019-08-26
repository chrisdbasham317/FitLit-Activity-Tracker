$(document).ready(function () {
  function getRanId() {
    return Math.floor(Math.random() * (50 - 1) + 1);
  }
  const dateToday = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
  const instanceId = getRanId();
  const userRepo = new UserRepository(userData);
  const getUser = userRepo.returnUser(instanceId);
  const user = new User(getUser);
  // console.log(user)
  const hydrationRepo = new HydrationRepository(hydrationData);
  const getHydration = hydrationRepo.returnUserHydration(instanceId); 
  const userHydration = new Hydration(getHydration);
  // console.log(userHydration)
  const sleepRepo = new SleepRepository(sleepData);
  const getSleep = sleepRepo.returnUserSleep(instanceId);
  const userSleep = new Sleep(getSleep);
  // console.log(userSleep)
  const activityRepo = new ActivityRepository(activityData);
  const getActivity = activityRepo.returnUserActivityByID(instanceId);
  const userActivity = new Activity(getActivity);
  // console.log(userActivity);

  //Inserts Hydration Data to DOM
  $(`<p>${userHydration.getOuncesByDate(dateToday)}</p>`).insertAfter(".h3--daily-oz");
  $(`<p>${userHydration.getWeeklyOunces(dateToday)}</p>`).insertAfter(".h3--weekly-oz");
  // $(`<p>${userHydration.getOuncesByDate(dateToday)}</p>`).insertAfter(".h2--hydration");

  //Inserts Sleep Data to DOM
  $(`<p class="p p--daily-sleep">${userSleep.calculateDailySleep(dateToday)}</p>`).insertAfter(".h3--daily-sleep");
  $(`<p>${userSleep.calculateDailySleepQual(dateToday)}</p>`).insertAfter(".p--daily-sleep");
  $(`<p class="p p--weekly-sleep">${userSleep.calculateSleepOverWeek(dateToday)}</p>`).insertAfter(".h3--weekly-sleep");
  $(`<p>${userSleep.calculateWeeklySleepQual(dateToday)}</p>`).insertAfter(".h3--avg-sleep-quality");
  $(`<p>${userSleep.calculateAverageSleepQual()}</p>`).insertAfter(".h4--sleep-qual-record");
  $(`<p>${userSleep.calculateAverageSleep()}</p>`).insertAfter(".h4--sleep-time-record");

  // inserts activity data onto the DOM
  $(`<p class="p p--daily-time-active">${userActivity.getMinutesActiveDay(dateToday, 'minutesActive')} minutes</p>`).insertAfter(".h4--time-active-daily");
  $(`<p class="p p--weekly-time-active">${userActivity.getMinutesActiveWeek(dateToday, 'minutesActive')} minutes</p>`).insertAfter(".h4--time-active-weekly");
  $(`<h4 class="h4 h4--miles-daily">Today's Mile Count</h4>
  <p class="p p--miles-walked">${userActivity.getMilesWalkedDay(dateToday, 'numSteps', user)}</p>`).insertAfter('.article--miles-daily');
  $(`<h4 class="h4 h4--steps-daily">Today's Step Count</h4>
  <p class="p p--daily-steps">${userActivity.getActivityTotal(dateToday, 'numSteps')} steps / ${user.dailyStepGoal} steps</p>`).insertAfter('.article--step-goal-daily');
  $(`<h4 class="h4 h4--steps-weekly">Weekly Step Average</h4>
  <p class="p p--weekly-steps">${userActivity.getMinutesActiveWeek(dateToday, 'numSteps')} steps on average.</p>`).insertAfter('.article--step-goal-daily');

  let oz = [userHydration.getOuncesByDate(dateToday)];
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: oz,
    datasets: [
        { 
          data: oz,
          label: "Daily Oz. consumed",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        }
      ]
    }
  });




});