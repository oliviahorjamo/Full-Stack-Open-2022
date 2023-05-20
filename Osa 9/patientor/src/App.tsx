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


// Extend a patient's page in the frontend to list the date, description and diagnoseCodes
// of the patent's entries

// TODO
// 3. in patent component find entries
// 4. Create a component for each entry
// 5. in patient component map each entry to an entry component