/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
    "textbooks",
    [
      {
        textBooktitle: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        ISBN: "978-0262033848",
        courseID: 1,
        edition: 3,
        availabilityStatus: "available",
        e_book: false, // New field
        hard_copy: true,
        no_of_hardCopies: 10, // New field
        date_of_publish: new Date("2009-07-31"), // New field
        latest_version: "3rd Edition", // New field
        old_version: "2nd Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "Clean Code",
        author: "Robert C. Martin",
        ISBN: "978-0136083238",
        courseID: 2,
        edition: 1,
        availabilityStatus: "available",
        e_book: true, // New field
        hard_copy: true,
        no_of_hardCopies: 5, // New field
        date_of_publish: new Date("2008-08-01"), // New field
        latest_version: "1st Edition", // New field
        old_version: null, // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        ISBN: "978-0135957059",
        courseID: 3,
        edition: 20,
        availabilityStatus: "available",
        e_book: true, // New field
        hard_copy: true,
        no_of_hardCopies: 8, // New field
        date_of_publish: new Date("2019-10-30"), // New field
        latest_version: "20th Anniversary Edition", // New field
        old_version: "20th Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "You Don’t Know JS",
        author: "Kyle Simpson",
        ISBN: "978-1491950296",
        courseID: 4,
        edition: 2,
        availabilityStatus: "available",
        e_book: true, // New field
        hard_copy: false,
        no_of_hardCopies: null, // New field
        date_of_publish: new Date("2015-05-30"), // New field
        latest_version: "2nd Edition", // New field
        old_version: "1st Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle:
          "Design Patterns: Elements of Reusable Object-Oriented Software",
        author: "Erich Gamma",
        ISBN: "978-0201633610",
        courseID: 5,
        edition: 1,
        availabilityStatus: "available",
        e_book: false, // New field
        hard_copy: true,
        no_of_hardCopies: 7, // New field
        date_of_publish: new Date("1994-10-31"), // New field
        latest_version: "1st Edition", // New field
        old_version: null, // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        ISBN: "978-0596517748",
        courseID: 6,
        edition: 1,
        availabilityStatus: "non-available",
        e_book: false, // New field
        hard_copy: true,
        no_of_hardCopies: 4, // New field
        date_of_publish: new Date("2008-05-15"), // New field
        latest_version: "1st Edition", // New field
        old_version: null, // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "Refactoring: Improving the Design of Existing Code",
        author: "Martin Fowler",
        ISBN: "978-0134757599",
        courseID: 7,
        edition: 2,
        availabilityStatus: "non-available",
        e_book: true, // New field
        hard_copy: false,
        no_of_hardCopies: null, // New field
        date_of_publish: new Date("2018-01-01"), // New field
        latest_version: "2nd Edition", // New field
        old_version: "1st Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "Effective Java",
        author: "Joshua Bloch",
        ISBN: "978-0134685991",
        courseID: 8,
        edition: 3,
        availabilityStatus: "available",
        e_book: false, // New field
        hard_copy: true,
        no_of_hardCopies: 5, // New field
        date_of_publish: new Date("2017-12-27"), // New field
        latest_version: "3rd Edition", // New field
        old_version: "2nd Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
        ISBN: "978-0984782857",
        courseID: 9,
        edition: 6,
        availabilityStatus: "available",
        e_book: true, // New field
        hard_copy: false,
        no_of_hardCopies: null, // New field
        date_of_publish: new Date("2015-07-01"), // New field
        latest_version: "6th Edition", // New field
        old_version: "5th Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        textBooktitle: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        ISBN: "978-0136042594",
        courseID: 10,
        edition: 3,
        availabilityStatus: "available",
        e_book: true, // New field
        hard_copy: false,
        no_of_hardCopies: null, // New field
        date_of_publish: new Date("2010-03-15"), // New field
        latest_version: "3rd Edition", // New field
        old_version: "2nd Edition", // New field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("textbooks", null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'textbooks_textbookID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for textBookID to start from 1 again
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "textbooks_textbookID_seq" RESTART WITH 1;'
    );
  } else {
    console.log("Sequence textbooks_textbookID_seq does not exist.");
  }
};
