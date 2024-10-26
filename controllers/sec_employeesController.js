import { secEmployeesService } from "../services/sec_employeeService.js";

export class secEmployeeController {
    constructor() {
        this.secEmployeeService = new secEmployeesService(); 
    }
// Add a course to a security employee
 addCourse = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const { courseID } = req.body;

        const result = await this.secEmployeeService.addCourse(employeeID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a course from a security employee
 removeCourse = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const { courseID } = req.body;

        const result = await this.secEmployeeService.removeCourse(employeeID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
