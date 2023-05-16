import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3001;

app.use('/api/diagnoses/', diagnoseRouter);
app.use('/api/patients/', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exercises 9.10...
// make folders src for all code
// within which you should have routes
// and data (not necessarily within src right?)
// get the files diagnoses.ts and patiens.ts and put to data
// create an api endpoint for getting the diagnose data
// includes creating a datatype for a diagnose

// 9.11
// create an utility type for excluding the field ssn (use Omit here)
// create an api endpoint api/patients for finding the patients
// this part requires creating a route for for the get result
// and creating a type for the data
// and in the route excluding the omitted field from the data