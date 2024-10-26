import * as secEmployeeService from '../services/secEmployeeService.js';

// Add a course to a security employee
export const addCourse = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const { courseID } = req.body;

        const result = await secEmployeeService.addCourse(employeeID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a course from a security employee
export const removeCourse = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const { courseID } = req.body;

        const result = await secEmployeeService.removeCourse(employeeID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
