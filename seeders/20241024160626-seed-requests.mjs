/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('requests', [
    {
      userID: 1, // Assuming user with ID 1 exists
      textbookID: 1, // Assuming textbook with ID 1 exists
      date: new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 2, // Assuming user with ID 2 exists
      textbookID: 2, // Assuming textbook with ID 2 exists
      date: new Date(),
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 3, // Assuming user with ID 3 exists
      textbookID: 3, // Assuming textbook with ID 3 exists
      date: new Date(),
      status: 'denied',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 4, // Assuming user with ID 4 exists
      textbookID: 4, // Assuming textbook with ID 4 exists
      date: new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 5, // Assuming user with ID 5 exists
      textbookID: 5, // Assuming textbook with ID 5 exists
      date: new Date(),
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 6, // Assuming user with ID 6 exists
      textbookID: 6, // Assuming textbook with ID 6 exists
      date: new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 7, // Assuming user with ID 7 exists
      textbookID: 7, // Assuming textbook with ID 7 exists
      date: new Date(),
      status: 'denied',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 8, // Assuming user with ID 8 exists
      textbookID: 8, // Assuming textbook with ID 8 exists
      date: new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 9, // Assuming user with ID 9 exists
      textbookID: 9, // Assuming textbook with ID 9 exists
      date: new Date(),
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userID: 10, // Assuming user with ID 10 exists
      textbookID: 10, // Assuming textbook with ID 10 exists
      date: new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('requests', null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'requests_inventoryID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for requestID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "requests_inventoryID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence requests_inventoryID_seq does not exist.');
  }
};
