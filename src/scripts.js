$(document).ready(function () {
  function getRanId() {
    return Math.floor(Math.random() * (50 - 1) + 1);
  }
  const dateToday = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
  const instanceId = getRanId();
  const userRepo = new UserRepository(userData);
  const getUser = userRepo.returnUser(instanceId);
  const user = new User(getUser);
  const friendsFName = user.friends.map(elem => userRepo.returnUser(elem)['name'].split(' ')[0]);
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

  //Inserts User Info to DOM
  $(`<h1>${user.findName()}'s</h1>`).insertBefore('h1');
  $(`<ul class="ul ul--user-info hide bring-to-front">
  <p class="p--user-prompt">Hello, ${user.name}</p>
  <p class="p--profile-prompt">Here is your user profile:</p>
  <li class="li">User ID: ${user.id}</li>
  <li class="li">Address: ${user.address}</li>
  <li class="li">Email: ${user.email}</li>
  <li class="li">Stride Length: ${user.strideLength}</li>
  <li class="li">Daily Step Goal: ${user.dailyStepGoal}</li>
  <li class="li">Friends: ${friendsFName.join(', ')}</li>
  <div class="backdrop hide"></div>
  </ul>`).appendTo('.article--hamburger-menu');
  $('.img-hamburger-btn').on('click', function () {
    $('.ul--user-info, .backdrop').toggleClass('hide');
  });

  //Inserts Hydration Data to DOM
  // $(`<p>${userHydration.getOuncesByDate(dateToday)}</p>`).insertAfter(".h3--daily-oz");
  $(`<p>${userHydration.getWeeklyOunces(dateToday)}</p>`).insertAfter(".h3--weekly-oz");
  // $(`<p>${userHydration.getOuncesByDate(dateToday)}</p>`).insertAfter(".h2--hydration");

  //Inserts Sleep Data to DOM
  $(`<p class="p p--daily-sleep">${userSleep.calculateDailySleep(dateToday)}</p>`).insertAfter(".h3--daily-sleep");
  $(`<p>${userSleep.calculateDailySleepQual(dateToday)}</p>`).insertAfter(".p--daily-sleep");
  $(`<p class="p p--weekly-sleep">${userSleep.calculateSleepOverWeek(dateToday)}</p>`).insertAfter(".h3--weekly-sleep");
  $(`<p>${userSleep.calculateWeeklySleepQual(dateToday)}</p>`).insertAfter(".h3--avg-sleep-quality");
  $(`<p>${userSleep.calculateAverageSleepQual()}</p>`).insertAfter(".h4--sleep-qual-record");
  $(`<p>${userSleep.calculateAverageSleep()}</p>`).insertAfter(".h4--sleep-time-record");

  // Inserts Activity Data onto the DOM
  $(`<p class="p p--daily-time-active">${userActivity.getMinutesActiveDay(dateToday, 'minutesActive')} minutes</p>`).insertAfter(".h4--time-active-daily");
  $(`<p class="p p--weekly-time-active">${userActivity.getMinutesActiveWeek(dateToday, 'minutesActive')} minutes</p>`).insertAfter(".h4--time-active-weekly");
  $(`<h4 class="h4 h4--miles-daily">Today's Mile Count</h4>
  <p class="p p--miles-walked">${userActivity.getMilesWalkedDay(dateToday, 'numSteps', user)}</p>`).insertAfter('.article--miles-daily');
  $(`<h4 class="h4 h4--steps-daily">Today's Step Count</h4>
  <p class="p p--daily-steps">${userActivity.getActivityTotal(dateToday, 'numSteps')} steps / ${user.dailyStepGoal} steps</p>`).insertAfter('.article--step-goal-daily');
  $(`<h4 class="h4 h4--steps-weekly">Weekly Step Average</h4>
  <p class="p p--weekly-steps">${userActivity.getMinutesActiveWeek(dateToday, 'numSteps')} steps on average</p>`).insertAfter('.article--step-goal-weekly');
  $(`<h4 class="h4 h4--stairs-daily">Today's Stairs</h4>
  <p class="p p--stairs-daily">${userActivity.getActivityTotal(dateToday, 'flightsOfStairs')} flights of stairs climbed today!</p>`).insertAfter('.h3--breakdown');
  $(`<h4 class="h4 h4--stairs-weekly">Weekly Stair Average</h4>
  <p class="p p--stairs-weekly">${userActivity.getMinutesActiveWeek(dateToday, 'flightsOfStairs')} average flights of stairs climbed!</p>`).insertAfter('.p--stairs-daily');

  // Inserts Community Data to the DOM
  $(`<h4 class="h4 h4--community-time-active">Community Time Active</h4>
  <p class="p p--community-time-active">${activityRepo.getAvgActivity(dateToday, 'minutesActive')}</p>`).insertAfter('.h3--community-daily');
  $(`<h4 class="h4 h4--community-steps">Community Step Average</h4>
  <p class="p p--community-steps">${activityRepo.getAvgActivity(dateToday, 'numSteps')}</p>`).insertAfter('.p--community-time-active');
  $(`<h4 class="h4 h4--community-stairs">Community Average Stairs Climbed</h4>
  <p class="p p--community-stairs">${activityRepo.getAvgActivity(dateToday, 'flightsOfStairs')}</p>`).insertAfter('.p--community-steps');
  $(`<h4 class="h4 h4--community-ounces">Community Average Water Intake</h4>
  <p class="p p--community-ounces">${hydrationRepo.getAvgOunces(dateToday)}</p>`).insertAfter('.p--community-stairs');

// Inserts Charts on DOM
  let oz = [userHydration.getOuncesByDate(dateToday)];
  let ozByDateChart = $('#oz-by-date');
  let dailyOzChart = new Chart(ozByDateChart, {
  type: 'bar',
  data: {
    labels: oz,
    datasets: [
        { 
          title:{
            text: "Daily Oz. consumed",
            fontSize: 50,
            },
          data: oz,
          label: "Daily Oz. consumed",
          backgroundColor: "#0B4EBE",
        }
      ],
      fontColor: 'black',
    }
  });

  let dailyMileCount = [userActivity.getMilesWalkedDay(dateToday, 'numSteps', user)];
  dailyMileCount.unshift(10)
  let milesByDateChart = $('#daily-mile-count');
  let dailyMileChart = new Chart(milesByDateChart, {
  type: 'polarArea',
  data: {
    labels: dailyMileCount,
    datasets: [
        { 
          data: dailyMileCount,
          label: "Daily Mile Count",
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

  let dailyStepTotal = userActivity.getActivityTotal(dateToday, 'numSteps');
  let dailyStepGoal = user.dailyStepGoal;
  let todaysStepMetrics = [dailyStepTotal, dailyStepGoal];
  
  let stepGoalByDateChart = $('#daily-step-metric');
  let dailyStepGoalChart = new Chart(stepGoalByDateChart, {
  type: 'doughnut',
  data: {
    labels: todaysStepMetrics,
    datasets: [
        { 
          data: todaysStepMetrics,
          label: "Daily Step Count out of Total",
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