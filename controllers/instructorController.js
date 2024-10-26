import * as instructorService from '../services/instructorService.js';

// Add a course to an instructor
export const addCourse = async (req, res) => {
    try {
        const { instructorID } = req.params;
        const { courseID } = req.body;

        const result = await instructorService.addCourse(instructorID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Drop a course from an instructor
export const dropCourse = async (req, res) => {
    try {
        const { instructorID } = req.params;
        const { courseID } = req.body;

        const result = await instructorService.dropCourse(instructorID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
