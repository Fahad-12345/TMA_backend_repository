/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('courses', [
    {
      courseName: 'Introduction to Computer Science',
      courseCode: 'CS101',
      description: 'Fundamentals of computer science.',
      semester: 'Fall',
      year: 2024,
      // textbookID: 1,
      instructorID: 1,
      sec_Employee_ID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Calculus I',
      courseCode: 'MATH101',
      description: 'Introduction to calculus concepts.',
      semester: 'Fall',
      year: 2024,
      // textbookID: 2,
      instructorID: 2,
      sec_Employee_ID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Introduction to Biology',
      courseCode: 'BIO101',
      description: 'Basic principles of biology.',
      semester: 'Spring',
      year: 2024,
      // textbookID: 3,
      instructorID: 3,
      sec_Employee_ID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Physics I',
      courseCode: 'PHY101',
      description: 'Fundamentals of physics.',
      semester: 'Spring',
      year: 2024,
      // textbookID: 4,
      instructorID: 4,
      sec_Employee_ID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Chemistry I',
      courseCode: 'CHEM101',
      description: 'Introduction to general chemistry.',
      semester: 'Fall',
      year: 2024,
      // textbookID: 5,
      instructorID: 5,
      sec_Employee_ID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'English Composition',
      courseCode: 'ENG101',
      description: 'Writing and composition skills.',
      semester: 'Spring',
      year: 2024,
      // textbookID: 6,
      instructorID: 6,
      sec_Employee_ID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'World History',
      courseCode: 'HIST101',
      description: 'Survey of world history.',
      semester: 'Fall',
      year: 2024,
      // textbookID: 7,
      instructorID: 7,
      sec_Employee_ID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Psychology I',
      courseCode: 'PSY101',
      description: 'Introduction to psychology.',
      semester: 'Spring',
      year: 2024,
      // textbookID: 8,
      instructorID: 8,
      sec_Employee_ID: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Sociology I',
      courseCode: 'SOC101',
      description: 'Basic principles of sociology.',
      semester: 'Fall',
      year: 2024,
      // textbookID: 9,
      instructorID: 9,
      sec_Employee_ID: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      courseName: 'Statistics I',
      courseCode: 'STAT101',
      description: 'Introduction to statistical methods.',
      semester: 'Spring',
      year: 2024,
      // textbookID: 10,
      instructorID: 10,
      sec_Employee_ID: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('courses', null, {});

  // Check if the sequence exists and reset it
  const sequenceExists = await queryInterface.sequelize.query(`
    SELECT COUNT(*)
    FROM information_schema.sequences
    WHERE sequence_name = 'courses_courseID_seq';
  `);

  if (parseInt(sequenceExists[0][0].count) > 0) {
    // Reset the sequence for requestID to start from 1 again
    await queryInterface.sequelize.query('ALTER SEQUENCE "courses_courseID_seq" RESTART WITH 1;');
  } else {
    console.log('Sequence courses_courseID_seq does not exist.');
  }
};
