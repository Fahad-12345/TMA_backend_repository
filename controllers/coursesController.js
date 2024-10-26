import { courseService } from "../services/courseService.js";

export class courseController {
  constructor(){
    this.courseServc = new courseService();
  }
// Assign a book to a course
 assignBook = async (req, res) => {
    try {
        // const { courseID } = req.params;
        const { courseID,textbookID } = req.body;

        const updatedCourse = await this.courseServc.assignBook(courseID, textbookID);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve the assigned book for a course
 retrieveBook = async (req, res) => {
    console.log(req.body,'reqq')
    try {
        const assignedBook = await this.courseServc.retrieveBook(req);
        res.status(200).json(assignedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
