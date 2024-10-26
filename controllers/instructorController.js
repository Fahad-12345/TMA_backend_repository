import { instructorService } from "../services/instructorService.js";


export class instructorController {
    constructor() {
        this.instructorService = new instructorService(); 
    }
// Add a course to an instructor
addCourse = async (req, res) => {
    const { courseName, textbookID, instructorID } = req.body;

    try {
        const result = await this.instructorService.addCourse({ courseName, textbookID, instructorID });

        if (!result.success) {
            return res.status(404).json({ error: result.message });
        }

        return res.status(201).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Drop a course from an instructor
dropCourse = async (req, res) => {
    const { courseID, instructorID } = req.body;

    try {
        const result = await this.instructorService.dropCourse({ courseID , instructorID });

        if (!result.success) {
            return res.status(404).json({ error: result.message });
        }

        return res.status(201).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
}
