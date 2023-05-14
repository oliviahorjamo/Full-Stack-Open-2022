type BmiRange = {
  name: string;
  range: {min: number, max: number};
};

type BmiValues = {
  value1: number,
  value2: number
}


const parseArgumentsBmi = (args: string[]): BmiValues => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const ranges: BmiRange[] = [
  { name: 'underweight', range: { min: -Infinity, max: 18.5 } },
  { name: 'normal', range: { min: 18.5, max: 24.9 } },
  { name: 'overweight', range: { min: 25, max: 29.9 } },
  { name: 'obese', range: { min: 30, max: Infinity } },
];

function inRange(x:number, min:number, max:number):boolean {
  return x >= min && x <= max;
}

const calculateBmi = (height: number, weight: number):string => {
  const heightInMeters = height / 100
  const bmi = weight / heightInMeters ** 2
  for (const range of ranges) {
    if (inRange(bmi, range.range.min, range.range.max)) {
      return range.name
    }
  }
  return 'BMI not within any given range'
}


try {
  const { value1, value2 } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}