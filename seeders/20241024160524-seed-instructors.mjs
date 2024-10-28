/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('instructors', [
    {
      userID: 1, // Assuming user with ID 1 exists
      department: 'Computer Science',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 2, // Assuming user with ID 2 exists
      department: 'Mathematics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 3, // Assuming user with ID 3 exists
      department: 'Biology',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 4, // Assuming user with ID 4 exists
      department: 'Physics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 5, // Assuming user with ID 5 exists
      department: 'Chemistry',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 6, // Assuming user with ID 6 exists
      department: 'Engineering',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 7, // Assuming user with ID 7 exists
      department: 'Economics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 8, // Assuming user with ID 8 exists
      department: 'Literature',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 9, // Assuming user with ID 9 exists
      department: 'Political Science',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 10, // Assuming user with ID 10 exists
      department: 'History',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('instructors', null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'instructors_instructorID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for instructorID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "instructors_instructorID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence instructors_instructorID_seq does not exist.');
  }
};
