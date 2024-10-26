import { courseService } from "../services/courseService.js";

export class courseController {
  constructor(){
    this.courseServc = new courseService();
  }
// Assign a book to a course
 assignBook = async (req, res) => {
    try {
        const { courseID } = req.params;
        const { bookID } = req.body;

        const updatedCourse = await this.courseServc.assignBook(courseID, bookID);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve the assigned book for a course
 retrieveBook = async (req, res) => {
    try {
        const { courseID } = req.params;

        const assignedBook = await this.courseServc.retrieveBook(courseID);
        res.status(200).json(assignedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
