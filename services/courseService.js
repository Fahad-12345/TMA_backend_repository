import { text } from 'express';
import sequelize from '../config/db.js';
import Course from '../models/Course.js'; 
import Textbook from '../models/Textbook.js'; 


export class courseService {

// // Assign a book to a course by updating the bookID
//  assignBook = async (courseID, textbookID) => {
//     try {
//         const course = await Course.findOne({ where: { courseID } });
//         if (!course) throw new Error('Course not found');

//         course.textbookID = textbookID;
//         await course.save();
//         return course;
//     } catch (error) {
//         throw new Error('Error assigning book: ' + error.message);
//     }
// };

// /// Retrieve the book assigned to a course
// retrieveBook = async (req, res) => {
//     const { courseID } = req.body; // Ensure courseID is in the request body
//     console.log(req.body, 'req body');
    
//     try {
//         const courseWithTextbook = `
//             SELECT c.*, t."textBooktitle", t."author",t."ISBN",t."edition",t."availabilityStatus"
//             FROM courses c
//             LEFT JOIN textbooks t ON c."textbookID" = t."textbookID"
//             WHERE c."courseID" = '${courseID}'
//         `;
        
//         const result = await sequelize.query(courseWithTextbook);
//         const result1 = result[0]; // This is the array containing the result

//         console.log(result1, 'result1'); // Log to see the structure
        
//         // Check if there are any results
//         if (result1.length === 0) {
//             return res.status(404).json({ error: 'No course found' });
//         }
        
//         // Get the first course record
//         const courseData = result1[0]; // Access the first element
//         const textbook =  { textBooktitle : courseData.textBooktitle, author: courseData.author,
//             ISBN:courseData.ISBN,edition:courseData.edition,availabityStatus:courseData.availabilityStatus };
//         console.log(textbook,'tttt')

//         // Return the associated textbook details
//         return textbook;
        
//     } catch (error) {
//         // Ensure that `res` is valid before trying to send an error response
//         if (res) {
//             return res.status(500).json({ error: 'Error retrieving assigned book: ' + error.message });
//         } else {
//             console.error('Response object is undefined', error);
//         }
//     }
// }
///////////////sample data /////////////////
addcourse = async (req, res) => {
  console.log(req.body,'111111111111')
  try {
    const {
      course_name,
      courseCode,
      semester,
      year
    } = req.body;

    if (
      !course_name ||
      !courseCode ||
      !semester ||
      !year 
    ) {
      return res
        .status(400)
        .json({ error: "All courses attributes are required" });
    }
    const newCourse = await Course.create(req.body);
    if(newCourse){
    return newCourse.courseID
    }
    else{
      console.error
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


getcourseById = async (courseID) => {
  try {
      const course = await Course.findByPk(courseID);
      console.log(course,'course')
      return course;
  } catch (error) {
      throw new Error("Failed to retrieve course");
  }
};


updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const existingPatient = await Patient.findByPk(id);
    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    await Patient.update(req.body, { where: { id } });

    // Update associated records

    //await Case.update(req.body, { where: { CaseId: id } });

    const updatedPatient1 = await Patient.findByPk(id);
    res.status(201).json(updatedPatient1);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("chopra", id);
    // const existingPatient = await Patient.findByPk(id);
    // if (!existingPatient) {
    //   res.status(404).json({ error: "Patient not found" });
    // }
    await Patient.update({ isDeleted: true }, { where: { id: id } });
    await cases.update({ isDeleted: true }, { where: { patientId: id } });
    await Appointment.update({ isDeleted: true }, { where: { CaseId: id } });
    await res.status(200).send({ Patient, cases, Appointment });
    // console.log(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/////////////////////////////////////////

getListingsFromTables = async (req, res) => {
  const isNotEmpty = (data) => {
    return data !== undefined && data !== null && data !== "";
  };
  // console.log(req,'servvvv')
    try {
      const { page, pageSize } = req.query;
      if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
        return res.status(400).json({ message: "Invalid pagination parameters" });
      }
      const offset = (page - 1) * pageSize;
      const filters = req.query;
  
      // console.log(filters,'filtersss');
      let conditions = "";
      conditions =
        conditions +
        (isNotEmpty(filters.course_id)
          ? ` AND c."courseID" = ${filters.course_id}`
          : "");
          
      conditions =
        conditions +
        (isNotEmpty(filters.course_name)
          ? ` AND c."courseName" LIKE '${filters.course_name}'`
          : "");
      conditions =
        conditions +
        (isNotEmpty(filters.assigned_book)
          ? ` AND textbook."textBooktitle" LIKE '${filters.assigned_book}'`
          : "");
  
      let whereClause = "";
      if (conditions !== "") {
        let outputString = conditions.replace(/^ AND\s*/, "");
        whereClause = `WHERE ${outputString}`;
      }
  
      const sqlQuery = `
         SELECT 
         c."courseID" AS course_id,
		     c."courseCode" AS Course_Code,
		     c."courseName" AS Course_Name,
         c."semester" AS Semester,
         c."year" AS enrollment_year,
		     textbook."textBooktitle" AS Assign_Book,
		     inv."quantityAvailable",
		    inv."quantityOnLoan"
        FROM courses as C
        LEFT JOIN textbooks as textbook ON C."textbookID" = textbook."textbookID"
        LEFT JOIN inventories as inv ON textbook."textbookID" = inv."textbookID"
        ${whereClause}
        LIMIT ${pageSize} OFFSET ${offset};
      `;
  
      // console.log("our query", sqlQuery);
  
      const listings = await Course.sequelize.query(sqlQuery)
      const newlistings = listings[0]
      // console.log("=======", newlistings);
      return newlistings;
      // res.status(200).json(newlistings);
    } catch (error) {
      console.error("Error getting listing :", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };




}
