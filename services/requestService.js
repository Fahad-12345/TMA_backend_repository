import  Request  from "../models/Request.js";


export class requestService {
// Create a new request
 createRequest = async (requestData) => {
    try {
        const newRequest = await Request.create(requestData);
        return newRequest;
    } catch (error) {
        throw new Error('Error creating request: ' + error.message);
    }
};

// Update a request's details
 updateRequest = async (requestID, updates) => {
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
 approveRequest = async (requestID) => {
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
 denyRequest = async (requestID) => {
    try {
        const request = await Request.findOne({ where: { requestID } });
        if (!request) throw new Error('Request not found');

        request.status = 'Denied';
        await request.save();
        return request;
    } catch (error) {
        throw new Error('Error denying request: ' + error.message);
    }
}
}
