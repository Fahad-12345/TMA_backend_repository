/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('courses', [
    {
      courseID: 'CS101',
      title: 'Introduction to Computer Science',
      textbookID: 1, // Assuming textbook with ID 1 exists
      instructorID: 1, // Assuming instructor with ID 1 exists
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseID: 'MAT101',
      title: 'Calculus I',
      textbookID: 2, // Assuming textbook with ID 2 exists
      instructorID: 2, // Assuming instructor with ID 2 exists
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseID: 'BIO101',
      title: 'Introduction to Biology',
      textbookID: 3, // Assuming textbook with ID 3 exists
      instructorID: 3, // Assuming instructor with ID 3 exists
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseID: 'PHY101',
      title: 'Physics I',
      textbookID: 4, // Assuming textbook with ID 4 exists
      instructorID: 4, // Assuming instructor with ID 4 exists
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('courses', null, {});
};
