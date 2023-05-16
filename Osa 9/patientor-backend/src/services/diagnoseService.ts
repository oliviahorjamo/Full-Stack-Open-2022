import diagnoseEntries from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseEntries;

const getDiagnoseEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoseEntries
};