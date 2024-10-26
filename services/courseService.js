import Course from '../models/Course.js'; 
import Textbook from '../models/Textbook.js'; 


export class courseService {

// Assign a book to a course by updating the bookID
 assignBook = async (courseID, bookID) => {
    try {
        const course = await Course.findOne({ where: { courseID } });
        if (!course) throw new Error('Course not found');

        course.bookID = bookID;
        await course.save();
        return course;
    } catch (error) {
        throw new Error('Error assigning book: ' + error.message);
    }
};

// Retrieve the book assigned to a course
 retrieveBook = async (courseID) => {
    try {
        const course = await Course.findOne({
            where: { courseID },
            include: [{ model: Textbook, as: 'assignedBook', attributes: ['bookID', 'title', 'author', 'isbn'] }] // Ensure relationship is defined
        });
        if (!course || !course.bookID) throw new Error('No book assigned to this course');
        return course.assignedBook;
    } catch (error) {
        throw new Error('Error retrieving assigned book: ' + error.message);
    }
}
}
