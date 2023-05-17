import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});


export default patientRouter;

// Create a POST endpoint for /api/patients which allows adding a new patient
// calls the util method for changing the type of the object to a new entry
// calls the service method for adding a new diary

// util method for creating a new entry
// takes an object as input
// assures that the object exists
// parses all fields
// a parser for each field that tests that the object is of expected type
// change the interfaces to types for values that have specific strings that they must contain
// makes a newEntry type

// you also need a newEntry type that doesn't have the field id, done

// service method for adding a new entry
// make a new diaryentry from the object and create field id
// add patient to the list of patients
// return the new entry
