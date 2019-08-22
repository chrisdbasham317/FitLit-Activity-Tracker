$(document).ready(function () {
  function getRanId() {
    return Math.floor(Math.random() * (50 - 1) + 1);
  }
  const dateToday = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`
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

  //Inserts Hydration Data to DOM
  $(`<p>${userHydration.getOuncesByDate(dateToday)}</p>`).insertAfter(".h3--daily-oz");
  $(`<p>${userHydration.getWeeklyOunces(dateToday)}</p>`).insertAfter(".h3--weekly-oz");
  $(`<p>${userHydration.getOuncesByDate(dateToday)}</p>`).insertAfter(".h2--hydration");

  //Inserts Sleep Data to DOM
  $(`<p class="p p--daily-sleep">${userSleep.calculateDailySleep(dateToday)}</p>`).insertAfter(".h3--daily-sleep");
  $(`<p>${userSleep.calculateDailySleepQual(dateToday)}</p>`).insertAfter(".p--daily-sleep");
  $(`<p class="p p--weekly-sleep">${userSleep.calculateSleepOverWeek(dateToday)}</p>`).insertAfter(".h3--weekly-sleep");
  $(`<p>${userSleep.calculateWeeklySleepQual(dateToday)}</p>`).insertAfter(".h3--avg-sleep-quality");
  $(`<p>${userSleep.calculateAverageSleepQual()}</p>`).insertAfter(".h4--sleep-qual-record");
  $(`<p>${userSleep.calculateAverageSleep()}</p>`).insertAfter(".h4--sleep-time-record");
});