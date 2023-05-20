import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { useMatch } from "react-router-dom";

import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/Patient";

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

// extend the entry listing on the patient's page to include the Entry's details with
// a new component that shows the rest of the inforamtion fo the patient's entries
// distinguishing types from each other

// you could use e.g. Icons to get appropriate visuals for your listing

// you should use a swtich case based rendering
