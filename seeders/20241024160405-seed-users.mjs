import bcrypt from 'bcrypt'; // or 'bcryptjs'

export const up = async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
        {
            Name: 'John Doe',
            Role: 'Admin',
            Email: 'john@example.com',
            Password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            Name: 'Jane Smith',
            Role: 'Instructor',
            Email: 'jane@example.com',
            Password: await bcrypt.hash('password456', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            Name: 'Michael Johnson',
            Role: 'Employee',
            Email: 'michael@example.com',
            Password: await bcrypt.hash('password789', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            Name: 'Sarah Connor',
            Role: 'Student',
            Email: 'sarah@example.com',
            Password: await bcrypt.hash('password101', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ], {});
};

export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
     // Check if the sequence exists and reset it
     const sequenceExists = await queryInterface.sequelize.query(`
        SELECT COUNT(*)
        FROM information_schema.sequences
        WHERE sequence_name = 'users_userID_seq';
      `);
  
      if (parseInt(sequenceExists[0][0].count) > 0) {
        // Reset the sequence for userID to start from 1 again
        await queryInterface.sequelize.query('ALTER SEQUENCE "users_userID_seq" RESTART WITH 1;');
      } else {
        console.log('Sequence users_userID_seq does not exist.');
      }
};
