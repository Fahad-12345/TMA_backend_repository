import express from 'express';
import { instructorController } from '../controllers/instructorController.js';

const InstructorRouter = express.Router();
const insController = new instructorController()

// Add a course to an instructor by instructorID
InstructorRouter.put('/:instructorID/add-course', insController.addCourse);

// Drop a course from an instructor by instructorID
InstructorRouter.delete('/:instructorID/drop-course', insController.dropCourse);

export default InstructorRouter;
