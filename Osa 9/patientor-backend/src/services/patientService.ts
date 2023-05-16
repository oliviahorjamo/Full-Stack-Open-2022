import patientEntries from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry } from '../types';

const patients: PatientEntry[] = patientEntries;

const getPatientEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries
};