
import sequelize from "../config/db.js";


export class instructorService {
// Add a course for an instructor
addCourse = async ({ courseName, textbookID, instructorID }) => {
    try {
        // Check if the instructor exists
        const instructorCheckQuery = `SELECT * FROM instructors WHERE "instructorID" = ${instructorID}`;
        const [instructorCheckResult] = await sequelize.query(instructorCheckQuery);

        if (instructorCheckResult.length === 0) {
            return { success: false, message: 'Instructor not found' };
        }

        // Insert the new course
        const insertCourseQuery = `
            INSERT INTO courses ("courseName", "textbookID", "instructorID")
            VALUES ('${courseName}', ${textbookID}, ${instructorID})`;

      const result =  await sequelize.query(insertCourseQuery);
if(result){
        return { success: true, message: 'Course added successfully' };
}
    } catch (error) {
        console.error('Error adding course:', error);
        throw new Error('Error adding course: ' + error.message);
    }
};



dropCourse = async ({ instructorID, courseID }) => {

    try {
        // Delete the specific course assignment for the instructor
        const query = `
            DELETE FROM courses
            WHERE "courseID" = $1 AND "instructorID" = $2
            RETURNING *;
        `;

        // Execute the query and pass the courseID and instructorID as parameters
        const result = await sequelize.query(query, {
            bind: [courseID, instructorID],
            type: sequelize.QueryTypes.DELETE,
        });
if(result){
        return { success: true, message: 'Course deleted successfully' };
}
    } catch (error) {
        console.error('Error adding course:', error);
        throw new Error('Error adding course: ' + error.message);
    }
};
}
