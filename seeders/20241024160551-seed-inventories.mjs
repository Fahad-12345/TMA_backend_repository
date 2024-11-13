/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
    "inventories",
    [
      {
        textbookID: 1, // Assuming textbook with ID 1 exists
        quantityAvailable: "30",
        quantityOnLoan: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 2, // Assuming textbook with ID 2 exists
        quantityAvailable: "25",
        quantityOnLoan: "10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 3, // Assuming textbook with ID 3 exists
        quantityAvailable: "20",
        quantityOnLoan: "8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 4, // Assuming textbook with ID 4 exists
        quantityAvailable: "15",
        quantityOnLoan: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 5, // Assuming textbook with ID 5 exists
        quantityAvailable: "40",
        quantityOnLoan: "7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 6, // Assuming textbook with ID 6 exists
        quantityAvailable: "35",
        quantityOnLoan: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 7, // Assuming textbook with ID 7 exists
        quantityAvailable: "28",
        quantityOnLoan: "6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 8, // Assuming textbook with ID 8 exists
        quantityAvailable: "22",
        quantityOnLoan: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 9, // Assuming textbook with ID 9 exists
        quantityAvailable: "50",
        quantityOnLoan: "12",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textbookID: 10, // Assuming textbook with ID 10 exists
        quantityAvailable: "45",
        quantityOnLoan: "9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("inventories", null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'inventories_InventoryID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for inventoryID to start from 1 again
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "inventories_InventoryID_seq" RESTART WITH 1;'
    );
  } else {
    console.log("Sequence inventories_inventoryID_seq does not exist.");
  }
};
