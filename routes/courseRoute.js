import express from 'express';
import { assignBook, retrieveBook } from '../controllers/courseController.js';

const router = express.Router();

// Assign a book to a course by courseID
router.put('/:courseID/assign', assignBook);

// Retrieve the assigned book for a course by courseID
router.get('/:courseID/book', retrieveBook);

export default router;
