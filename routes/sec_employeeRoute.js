import express from 'express';
import { addCourse, removeCourse } from '../controllers/secEmployeeController.js';

const router = express.Router();

// Add a course to a security employee by employeeID
router.put('/:employeeID/add-course', addCourse);

// Remove a course from a security employee by employeeID
router.delete('/:employeeID/remove-course', removeCourse);

export default router;
