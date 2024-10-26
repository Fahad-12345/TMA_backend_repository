import { requestService } from "../services/requestService.js";

export class requestController {

    constructor() {
        this.reqService = new requestService(); 
    }
// Create a new request
 createRequest = async (req, res) => {
    try {
        const requestData = req.body;
        const newRequest = await this.reqService.createRequest(requestData);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing request
 updateRequest = async (req, res) => {
    try {
        const { requestID } = req.params;
        const updates = req.body;
        
        const updatedRequest = await this.reqService.updateRequest(requestID, updates);
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Approve a request
 approveRequest = async (req, res) => {
    try {
        const { requestID } = req.params;

        const approvedRequest = await this.reqService.approveRequest(requestID);
        res.status(200).json(approvedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deny a request
 denyRequest = async (req, res) => {
    try {
        const { requestID } = req.params;

        const deniedRequest = await this.reqService.denyRequest(requestID);
        res.status(200).json(deniedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
