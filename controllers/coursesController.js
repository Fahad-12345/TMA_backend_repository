import * as courseService from '../services/courseService.js';

// Assign a book to a course
export const assignBook = async (req, res) => {
    try {
        const { courseID } = req.params;
        const { bookID } = req.body;

        const updatedCourse = await courseService.assignBook(courseID, bookID);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve the assigned book for a course
export const retrieveBook = async (req, res) => {
    try {
        const { courseID } = req.params;

        const assignedBook = await courseService.retrieveBook(courseID);
        res.status(200).json(assignedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
