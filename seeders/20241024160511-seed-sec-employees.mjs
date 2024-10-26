

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('sec_employees', [
    {
      userID: 1, // Assuming user with ID 1 exists
      enrollmentYear: 2022,
      department: 'CS',
      coursesTaught:'data science,AI',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 2, // Assuming user with ID 2 exists
      enrollmentYear: 2021,
      department: 'CS',
      coursesTaught:'machine learning,web 2.0',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 3, // Assuming user with ID 3 exists
      enrollmentYear: 2023,
      department: 'CS',
      coursesTaught:'data structure,OOP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 4, // Assuming user with ID 4 exists
      enrollmentYear: 2020,
      department: 'CS',
      coursesTaught:'data science,AI',
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
    // Reset the sequence for userID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "sec_employees_employeeID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence sec_employees_employeeID_seq does not exist.');
  }
};
