import { NewPatientEntry, Gender, Entry } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!isListOfEntries(entries)) {
    throw new Error('incorrect value given for entries: ' + entries);
  }
  return entries;
};

// this should be changed properly to test different entry types
const isListOfEntries = (list: unknown): list is Entry[] => {
  console.log(list);
  if (!Array.isArray(list)) {
    return false;
  }
  let allItemsEntries = true;
  list.forEach(element => {
    if (isString(element.type)) {
      const type = parseString(element.type);
      if (!(typeof element === 'object' && element !== null && ['OccupationalHealthcare', 'Hospital', 'HealthCheck'].includes(type))) {
        allItemsEntries = false;
      }
    }
  });
  return allItemsEntries;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect value given for string: ' + str);
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export default toNewPatientEntry;
