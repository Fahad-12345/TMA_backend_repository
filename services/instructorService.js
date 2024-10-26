import Instructor from '../models/Instructor.js';  // Make sure the Instructor model is defined
import Course from '../models/Course.js';          // Make sure the Course model is defined

// Add a course for an instructor
export const addCourse = async (instructorID, courseID) => {
    try {
        const instructor = await Instructor.findOne({ where: { instructorID } });
        if (!instructor) throw new Error('Instructor not found');

        const course = await Course.findOne({ where: { courseID } });
        if (!course) throw new Error('Course not found');

        // Assuming a many-to-many relationship, associate instructor with course
        await instructor.addCourse(course);  // This method requires Sequelize association setup
        return { message: 'Course added to instructor successfully' };
    } catch (error) {
        throw new Error('Error adding course: ' + error.message);
    }
};

// Drop a course for an instructor
export const dropCourse = async (instructorID, courseID) => {
    try {
        const instructor = await Instructor.findOne({ where: { instructorID } });
        if (!instructor) throw new Error('Instructor not found');

        const course = await Course.findOne({ where: { courseID } });
        if (!course) throw new Error('Course not found');

        // Remove the course association with the instructor
        await instructor.removeCourse(course);  // This method also requires Sequelize association
        return { message: 'Course removed from instructor successfully' };
    } catch (error) {
        throw new Error('Error dropping course: ' + error.message);
    }
};
