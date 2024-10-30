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
    
    try {
        const assignedBook = await this.courseServc.retrieveBook(req);
        res.status(200).json(assignedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

addcourse = async (req, res) => {
    // console.log(req.body,'reqq')
    try {
        const addcourse = await this.courseServc.addcourse(req);
        res.status(200).json(addcourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getcourseById = async (req, res) => {
    const { id: courseID } = req.params; 
    // console.log(courseID, 'reqq');
    
    if (!courseID) {
        return res.status(400).json({ error: "Course ID is required" });
    }

    try {
        const course = await this.courseServc.getcourseById(courseID); 
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ error: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


updateCourse = async (req, res) => {
    // console.log(req.body,'Updatereqq')
    try {
        const updateCourse = await this.courseServc.updateCourse(req);
        res.status(200).json(updateCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

deleteCourse = async (req, res) => {
    console.log(req.body,'reqq')
    try {
        const deleteCourse = await this.courseServc.deleteCourse(req);
        res.status(200).json(deleteCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




getListingsFromTables = async(req,res) => {
    try {
        const courselisting = await this.courseServc.getListingsFromTables(req);
        res.status(200).json(courselisting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
