import { v1 as uuid } from 'uuid';
import patientEntries from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

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

const addPatient = (entry: NewPatientEntry ): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {...entry, id};
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getById = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
  getById
};