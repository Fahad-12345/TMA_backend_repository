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
    // Reset the sequence for userID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "requests_inventoryID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence requests_inventoryID_seq does not exist.');
  }
};
