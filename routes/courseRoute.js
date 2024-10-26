import express from 'express';
import { courseController } from '../controllers/coursesController.js';

const CourseRouter = express.Router();
const courseControll = new courseController();

// Assign a book to a course by courseID
CourseRouter.put('/assignbook', courseControll.assignBook);

// Retrieve the assigned book for a course by courseID
CourseRouter.get('/getbook', courseControll.retrieveBook);

export default CourseRouter;
