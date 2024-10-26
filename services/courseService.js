import { text } from 'express';
import sequelize from '../config/db.js';
import Course from '../models/Course.js'; 
import Textbook from '../models/Textbook.js'; 


export class courseService {

// Assign a book to a course by updating the bookID
 assignBook = async (courseID, textbookID) => {
    try {
        const course = await Course.findOne({ where: { courseID } });
        if (!course) throw new Error('Course not found');

        course.textbookID = textbookID;
        await course.save();
        return course;
    } catch (error) {
        throw new Error('Error assigning book: ' + error.message);
    }
};

/// Retrieve the book assigned to a course
retrieveBook = async (req, res) => {
    const { courseID } = req.body; // Ensure courseID is in the request body
    console.log(req.body, 'req body');
    
    try {
        const courseWithTextbook = `
            SELECT c.*, t."textBooktitle", t."author",t."ISBN",t."edition",t."availabilityStatus"
            FROM courses c
            LEFT JOIN textbooks t ON c."textbookID" = t."textbookID"
            WHERE c."courseID" = '${courseID}'
        `;
        
        const result = await sequelize.query(courseWithTextbook);
        const result1 = result[0]; // This is the array containing the result

        console.log(result1, 'result1'); // Log to see the structure
        
        // Check if there are any results
        if (result1.length === 0) {
            return res.status(404).json({ error: 'No course found' });
        }
        
        // Get the first course record
        const courseData = result1[0]; // Access the first element
        const textbook =  { textBooktitle : courseData.textBooktitle, author: courseData.author,
            ISBN:courseData.ISBN,edition:courseData.edition,availabityStatus:courseData.availabilityStatus };
        console.log(textbook,'tttt')

        // Return the associated textbook details
        return textbook;
        
    } catch (error) {
        // Ensure that `res` is valid before trying to send an error response
        if (res) {
            return res.status(500).json({ error: 'Error retrieving assigned book: ' + error.message });
        } else {
            console.error('Response object is undefined', error);
        }
    }
}


}
