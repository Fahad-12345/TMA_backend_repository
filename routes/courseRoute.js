import express from "express";
import { courseController } from "../controllers/coursesController.js";

const CourseRouter = express.Router();
const courseControll = new courseController();

// Assign a book to a course by courseID
// CourseRouter.put('/assignbook', courseControll.assignBook);
// CourseRouter.get('/getbook', courseControll.retrieveBook);

// main apiss
CourseRouter.get("/Listing", courseControll.getListingsFromTables);
CourseRouter.post("/", courseControll.addcourse);
CourseRouter.get("/:id", courseControll.getcourseById);
CourseRouter.put("/:id", courseControll.updateCourse);
CourseRouter.delete("/:id", courseControll.deleteCourse);

export default CourseRouter;
