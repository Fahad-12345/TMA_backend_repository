import express from 'express';
import { addCourse, dropCourse } from '../controllers/instructorController.js';

const router = express.Router();

// Add a course to an instructor by instructorID
router.put('/:instructorID/add-course', addCourse);

// Drop a course from an instructor by instructorID
router.delete('/:instructorID/drop-course', dropCourse);

export default router;
