import { Request } from "../models";

// Create a new request
export const createRequest = async (requestData) => {
    try {
        const newRequest = await Request.create(requestData);
        return newRequest;
    } catch (error) {
        throw new Error('Error creating request: ' + error.message);
    }
};

// Update a request's details
export const updateRequest = async (requestID, updates) => {
    try {
        const request = await Request.findOne({ where: { requestID } });
        if (!request) throw new Error('Request not found');

        await request.update(updates);
        return request;
    } catch (error) {
        throw new Error('Error updating request: ' + error.message);
    }
};

// Approve a request
export const approveRequest = async (requestID) => {
    try {
        const request = await Request.findOne({ where: { requestID } });
        if (!request) throw new Error('Request not found');

        request.status = 'Approved';
        await request.save();
        return request;
    } catch (error) {
        throw new Error('Error approving request: ' + error.message);
    }
};

// Deny a request
export const denyRequest = async (requestID) => {
    try {
        const request = await Request.findOne({ where: { requestID } });
        if (!request) throw new Error('Request not found');

        request.status = 'Denied';
        await request.save();
        return request;
    } catch (error) {
        throw new Error('Error denying request: ' + error.message);
    }
};
