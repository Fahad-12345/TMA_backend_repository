import express from 'express';
import { createRequest, updateRequest, approveRequest, denyRequest } from '../controllers/requestController.js';

const router = express.Router();

// Create a new request
router.post('/', createRequest);

// Update an existing request
router.put('/:requestID', updateRequest);

// Approve a request
router.put('/:requestID/approve', approveRequest);

// Deny a request
router.put('/:requestID/deny', denyRequest);

export default router;
