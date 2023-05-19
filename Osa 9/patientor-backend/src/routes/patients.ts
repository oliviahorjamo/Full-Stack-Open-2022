import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getPatientEntries());
  //res.send(patientService.getNonSensitivePatientEntries());
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

patientRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('id given:', id);
  const patient = patientService.getById(id);
  res.status(200).send(patient);
  
});


export default patientRouter;
