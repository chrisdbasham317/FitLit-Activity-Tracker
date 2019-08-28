# FitLit Starter Kit

The link to our project: <a href=https://chrisdbasham317.github.io/FitLit-Activity-Tracker/src/index.html

## Abstract 

The puropse of this project is to get comfortable with ES6 Classes, datasets and having multilples of the two interactig with eachother to complete a data model. A fairly robust testing suite was also an essential piece of this project. All methods on each class were tested using a data subset. 

## Data Model Examples

**Users**

```
[
  {
    "id": [number],
    "name": [string],
    "address": [string],
    "email": [string],
    "strideLength": [number - feet],
    "dailyStepGoal": [number - steps],
    "friends": [array - one-way connection to other user(s)]
  },
  ...more user data
]
```

**Activity**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numSteps": [number - steps],
    "minutesActive": [number - minutes],
    "flightsOfStairs": [number - flights]
  },
  ...more activity data
]
```

**Hydration**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numOunces": [number - ounces]
  },
  ...more hydration data
]
```

**Sleep**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "hoursSlept": [number - hours],
    "sleepQuality": [number - unitless]
  },
  ...more sleep data
]
```

## Our Comp Design 

![screencapture-file-Users-noahgibson-Documents-mod2-fitlit-starter-kit-src-index-html-2019-08-28-15_07_07](https://user-images.githubusercontent.com/49107377/63893076-75d29580-c9a6-11e9-818a-ca9c5820e882.png)
