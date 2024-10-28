/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('sec_employees', [
    {
      userID: 1, // Assuming user with ID 1 exists
      enrollmentYear: 2022,
      department: 'CS',
      coursesTaught: 'Data Science, AI',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 2, // Assuming user with ID 2 exists
      enrollmentYear: 2021,
      department: 'CS',
      coursesTaught: 'Machine Learning, Web 2.0',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 3, // Assuming user with ID 3 exists
      enrollmentYear: 2023,
      department: 'CS',
      coursesTaught: 'Data Structure, OOP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 4, // Assuming user with ID 4 exists
      enrollmentYear: 2020,
      department: 'CS',
      coursesTaught: 'Data Science, AI',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 5, // Assuming user with ID 5 exists
      enrollmentYear: 2019,
      department: 'IT',
      coursesTaught: 'Network Security, Cryptography',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 6, // Assuming user with ID 6 exists
      enrollmentYear: 2018,
      department: 'CS',
      coursesTaught: 'Software Engineering, Algorithms',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 7, // Assuming user with ID 7 exists
      enrollmentYear: 2022,
      department: 'IT',
      coursesTaught: 'Database Management, SQL',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 8, // Assuming user with ID 8 exists
      enrollmentYear: 2021,
      department: 'EE',
      coursesTaught: 'Digital Logic Design, Circuits',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 9, // Assuming user with ID 9 exists
      enrollmentYear: 2023,
      department: 'ME',
      coursesTaught: 'Thermodynamics, Mechanics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 10, // Assuming user with ID 10 exists
      enrollmentYear: 2020,
      department: 'CS',
      coursesTaught: 'Cloud Computing, DevOps',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('sec_employees', null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'sec_employees_employeeID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for employeeID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "sec_employees_employeeID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence sec_employees_employeeID_seq does not exist.');
  }
};
