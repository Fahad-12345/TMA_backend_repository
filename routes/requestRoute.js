import express from 'express';
import { requestController } from '../controllers/requestsController.js';

const Reqrouter = express.Router();
const reqController = new requestController();

// Create a new request
Reqrouter.post('/', reqController.createRequest);

// Update an existing request
Reqrouter.put('/:requestID', reqController.updateRequest);

// Approve a request
Reqrouter.put('/:requestID/approve', reqController.approveRequest);

// Deny a request
Reqrouter.put('/:requestID/deny', reqController.denyRequest);

export default Reqrouter;
