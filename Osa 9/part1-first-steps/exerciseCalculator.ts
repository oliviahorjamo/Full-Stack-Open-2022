interface exerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  ratingNumber: number,
  ratingDescription: string,
  target: number,
  average: number
}


interface rating {
  description: string,
  differenceToGoal: {min: number, max: number},
  ratingNumber: number
}

const ratings: rating[] = [
  {description: 'bad', differenceToGoal: {min: -Infinity, max: -1}, ratingNumber: 1},
  {description: 'well done', differenceToGoal: {min: -1, max: 1}, ratingNumber: 2},
  {description: 'relax babe', differenceToGoal: {min: 1, max: Infinity}, ratingNumber: 3}
]

interface exerciseValues {
  exerciseHours: number[],
  target: number
}

const parseArgumentsExercises = (args: string[]): exerciseValues => {
    try {
      const argNumbers = args.map(a => Number(a))
      const target = argNumbers[2]
      return {
        exerciseHours: argNumbers.slice(3),
        target: target
      }
    } catch (error) {
      return error('All arguments must be numbers')
    }
  }

function inRange(x:number, min:number, max:number):boolean {
  return x >= min && x <= max;
}


const averageHoursTrained = (exerciseHours: number[]): number => {
  return exerciseHours.reduce((a, b) => a+b, 0) / exerciseHours.length
}

const numberOfDaysTrained = (exerciseHours: number[]): number => {
  return exerciseHours.filter(h => h > 0).length
}

const howWelltargetMet = (average: number, goal: number): rating => {
  const differenceToTarget = average - goal
  for (const r of ratings) {
    if (inRange(differenceToTarget, r.differenceToGoal.min, r.differenceToGoal.max)) {
      return r
    }
  }
}

const targetReached = (average: number, goal: number): boolean => {
  return average > goal
}

const giveExerciseResults = (exerciseHours: number[], target: number): exerciseResults => {
  const periodLength = exerciseHours.length
  const trainingDays = numberOfDaysTrained(exerciseHours)
  const average = averageHoursTrained(exerciseHours)
  const success = targetReached(average, target)
  const ratingGiven = howWelltargetMet(average, target)
  const ratingNumber = ratingGiven.ratingNumber
  const ratingDescription = ratingGiven.description
  return {
    periodLength,
    trainingDays,
    success,
    ratingNumber,
    ratingDescription,
    target,
    average
  }
}

//console.log(giveExerciseResults([3, 0, 2, 4.5, 0, 3, 1], 2))


try {
  const { exerciseHours, target } = parseArgumentsExercises(process.argv);
  console.log(giveExerciseResults(exerciseHours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}