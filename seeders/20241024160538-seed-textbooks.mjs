/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('textbooks', [
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      ISBN: '978-0262033848',
      edition: 3,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      ISBN: '978-0136083238',
      edition: 1,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      ISBN: '978-0135957059',
      edition: 20,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'You Don’t Know JS',
      author: 'Kyle Simpson',
      ISBN: '978-1491950296',
      edition: 2,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('textbooks', null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'textbooks_textbookID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for userID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "textbooks_textbookID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence textbooks_textbookID_seq does not exist.');
  }
};
