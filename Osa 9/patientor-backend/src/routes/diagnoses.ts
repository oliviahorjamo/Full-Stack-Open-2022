// All routes thus far needed in the project
// Can be later divided into modules with different names

import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoseEntries());
});


export default diagnoseRouter;