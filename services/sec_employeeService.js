import SecEmployee from '../models/SecEmployee.js';  // Assuming SecEmployee model is defined
import Course from '../models/Course.js';          // Assuming Course model is defined


export class secEmployeesService {
// Add a course for a security employee
 addCourse = async (employeeID, courseID) => {
    try {
        const employee = await SecEmployee.findOne({ where: { employeeID } });
        if (!employee) throw new Error('Employee not found');

        const course = await Course.findOne({ where: { courseID } });
        if (!course) throw new Error('Course not found');

        // Assuming a many-to-many relationship between sec_employee and courses
        await employee.addCourse(course);  // Requires Sequelize association setup
        return { message: 'Course added to security employee successfully' };
    } catch (error) {
        throw new Error('Error adding course: ' + error.message);
    }
};

// Remove a course from a security employee
 removeCourse = async (employeeID, courseID) => {
    try {
        const employee = await SecEmployee.findOne({ where: { employeeID } });
        if (!employee) throw new Error('Employee not found');

        const course = await Course.findOne({ where: { courseID } });
        if (!course) throw new Error('Course not found');

        // Remove the course association with the security employee
        await employee.removeCourse(course);  // Also requires Sequelize association
        return { message: 'Course removed from security employee successfully' };
    } catch (error) {
        throw new Error('Error removing course: ' + error.message);
    }
}
}
