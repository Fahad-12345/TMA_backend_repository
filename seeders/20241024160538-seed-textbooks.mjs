/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('textbooks', [
    {
      textBooktitle: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      ISBN: '978-0262033848',
      edition: 3,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'Clean Code',
      author: 'Robert C. Martin',
      ISBN: '978-0136083238',
      edition: 1,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      ISBN: '978-0135957059',
      edition: 20,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'You Don’t Know JS',
      author: 'Kyle Simpson',
      ISBN: '978-1491950296',
      edition: 2,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma',
      ISBN: '978-0201633610',
      edition: 1,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      ISBN: '978-0596517748',
      edition: 1,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
      ISBN: '978-0134757599',
      edition: 2,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'Effective Java',
      author: 'Joshua Bloch',
      ISBN: '978-0134685991',
      edition: 3,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'Cracking the Coding Interview',
      author: 'Gayle Laakmann McDowell',
      ISBN: '978-0984782857',
      edition: 6,
      availabilityStatus: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      textBooktitle: 'Artificial Intelligence: A Modern Approach',
      author: 'Stuart Russell',
      ISBN: '978-0136042594',
      edition: 3,
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
    // Reset the sequence for textBookID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "textbooks_textbookID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence textbooks_textbookID_seq does not exist.');
  }
};
