import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { useMatch } from "react-router-dom";

import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/Patient";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  
  const match = useMatch('/patients/:id')
  const patient = match
      ? patients.find(p => p.id === String(match.params.id))
      : null
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path='/patients/:id' element = {<PatientPage patient={patient}/>}/>
          </Routes>
        </Container>
    </div>
  );
};

export default App;


// App passes setPatients as a prop to PatientListPage (just like in the flight diaries my
// App passed setDiaries to the Form component)

// Find information regarding only one person
// The user should be able to access a patient's information by clicking the patients name

// TODO

// 2. create a new route for the patient, content = Patient component

// 3. change every patient to appear as a link in the table

// 