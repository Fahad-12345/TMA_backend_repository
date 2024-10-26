import * as requestService from '../services/requestService.js';

// Create a new request
export const createRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const newRequest = await requestService.createRequest(requestData);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing request
export const updateRequest = async (req, res) => {
    try {
        const { requestID } = req.params;
        const updates = req.body;
        
        const updatedRequest = await requestService.updateRequest(requestID, updates);
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Approve a request
export const approveRequest = async (req, res) => {
    try {
        const { requestID } = req.params;

        const approvedRequest = await requestService.approveRequest(requestID);
        res.status(200).json(approvedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deny a request
export const denyRequest = async (req, res) => {
    try {
        const { requestID } = req.params;

        const deniedRequest = await requestService.denyRequest(requestID);
        res.status(200).json(deniedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
