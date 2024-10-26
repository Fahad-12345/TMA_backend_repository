import express from 'express';
import { secEmployeeController } from '../controllers/sec_employeesController.js';

const secEmprouter = express.Router();
const secEmployeeControl = new secEmployeeController()

// Add a course to a security employee by employeeID
secEmprouter.put('/:employeeID/add-course', secEmployeeControl.addCourse);

// Remove a course from a security employee by employeeID
secEmprouter.delete('/:employeeID/remove-course', secEmployeeControl.removeCourse);

export default secEmprouter;
