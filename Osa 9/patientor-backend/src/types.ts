

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}


export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<DiagnoseEntry['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface Discharge {
  date: string,
  criteria: string
}

interface SickLeave {
  startDate: string,
  endDate: string
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  sickLeave?: SickLeave,
  employerName: string
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;