import bcrypt from "bcrypt"; // or 'bcryptjs'

export const up = async (queryInterface, Sequelize) => {
  const users = [
    {
      Name: "John Doe",
      Role: "Admin",
      Email: "john.doe@gmail.com",
      Password: await bcrypt.hash("password123", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Jane Smith",
      Role: "Instructor",
      Email: "jane.smith@yahoo.com",
      Password: await bcrypt.hash("password456", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Michael Johnson",
      Role: "Employee",
      Email: "michael.johnson@outlook.com",
      Password: await bcrypt.hash("password789", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Sarah Connor",
      Role: "Student",
      Email: "sarah.connor@gmail.com",
      Password: await bcrypt.hash("password101", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "David Brown",
      Role: "Instructor",
      Email: "david.brown@yahoo.com",
      Password: await bcrypt.hash("password202", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Emma Wilson",
      Role: "Student",
      Email: "emma.wilson@gmail.com",
      Password: await bcrypt.hash("password303", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Oliver Jones",
      Role: "Employee",
      Email: "oliver.jones@outlook.com",
      Password: await bcrypt.hash("password404", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Sophia Taylor",
      Role: "Student",
      Email: "sophia.taylor@gmail.com",
      Password: await bcrypt.hash("password505", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Liam Davis",
      Role: "Instructor",
      Email: "liam.davis@yahoo.com",
      Password: await bcrypt.hash("password606", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      Name: "Mia Anderson",
      Role: "Student",
      Email: "mia.anderson@gmail.com",
      Password: await bcrypt.hash("password707", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface.bulkInsert("users", users, {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("users", null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
        SELECT COUNT(*)
        FROM information_schema.sequences
        WHERE sequence_name = 'users_userID_seq';
    `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for userID to start from 1 again
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "users_userID_seq" RESTART WITH 1;'
    );
  } else {
    console.log("Sequence users_userID_seq does not exist.");
  }
};
