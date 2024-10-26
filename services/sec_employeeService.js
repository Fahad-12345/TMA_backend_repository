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

        // Update the course to associate it with the employee
        course.sec_Employee_ID = employeeID;  // Associate the employee with the course
        await course.save();  // Save the updated course

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

        const course = await Course.findOne({ where: { courseID, sec_Employee_ID: employeeID } });
        if (!course) throw new Error('Course not found or not associated with this employee');

        // Remove the employee association from the course
        course.sec_Employee_ID = null;  
        await course.save();  // Save the updated course

        return { message: 'Course removed from security employee successfully' };
    } catch (error) {
        throw new Error('Error removing course: ' + error.message);
    }
};
}
