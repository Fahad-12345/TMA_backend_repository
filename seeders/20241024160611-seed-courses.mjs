/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('courses', [
    {
      courseName: 'Introduction to Computer Science',
      textbookID: 1, // Assuming textbook with ID 1 exists
      instructorID: 1, // Assuming instructor with ID 1 exists
      sec_Employee_ID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Calculus I',
      textbookID: 2, // Assuming textbook with ID 2 exists
      instructorID: 2, // Assuming instructor with ID 2 exists
      sec_Employee_ID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Introduction to Biology',
      textbookID: 3, // Assuming textbook with ID 3 exists
      instructorID: 3, // Assuming instructor with ID 3 exists
      sec_Employee_ID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Physics I',
      textbookID: 4, // Assuming textbook with ID 4 exists
      instructorID: 4, // Assuming instructor with ID 4 exists
      sec_Employee_ID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('courses', null, {});
};
