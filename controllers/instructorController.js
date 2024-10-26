import { instructorService } from "../services/instructorService.js";


export class instructorController {
    constructor() {
        this.instructorService = new instructorService(); 
    }
// Add a course to an instructor
 addCourse = async (req, res) => {
    try {
        const { instructorID } = req.params;
        const { courseID } = req.body;

        const result = await this.instructorService.addCourse(instructorID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Drop a course from an instructor
 dropCourse = async (req, res) => {
    try {
        const { instructorID } = req.params;
        const { courseID } = req.body;

        const result = await this.insService.dropCourse(instructorID, courseID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
