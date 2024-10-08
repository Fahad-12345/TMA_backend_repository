// Import necessary modules
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/db.js';
import { promises as fs } from 'fs';

// Get the directory name and file path for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Provide the full path to the Excel file in your Downloads folder
const filePath = path.join(__dirname, 'tma_data_sheet - Copy.xlsx');

// Read the JSON config file
const configPath = path.join(__dirname, 'config/config.json');

// Function to read the config file
const readConfig = async () => {
  try {
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config file:', error);
    throw error;
  }
};


// Read the Excel file and extract headers and data
const readExcelFile = () => {
  const workbook = XLSX.readFile(filePath);
  const sheet_name = workbook.SheetNames[0];
  
  // Read all rows including headers
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name], { header: 1 });

  const headers = data[0]; // Get the first row as headers
  const rows = data.slice(1); // Get the remaining rows

  // Check the headers and rows for debugging
  console.log('Headers:', headers);
  console.log('Rows:', rows);

  // Map the rows to objects using headers
  const mappedData = rows.map(row => {
    const rowData = {};
    
    // Ensure each header is treated as a string
    headers.forEach((header, index) => {
      rowData[header] = row[index]; // Map each header to its corresponding value in the row
    });
    
    return rowData;
  });

  return mappedData; // Return the mapped data
};

// Insert data into PostgreSQL
const TextBookData = async (data) => {
  for (const row of data) {
    const title = row['Book Title'];    // Map using header names
    const author = row['Author(s)'];
    const isbn = row['ISBN'];
    const edition = row['Publication Year'];
       // Merge Male Center, Female Center, and General Store into availabilityStatus
       const maleCenter = row['Available Stock \r\n(Male Center)'];
       
       const femaleCenter = row['Available Stock \r\n(Female Center)'];
       
       const generalStore = row['Available Stock \r\n(General Store)'];
       
   
       // Concatenate the values into a single availabilityStatus field
       const availabilityStatus = `${maleCenter || ''} ${femaleCenter || ''} ${generalStore || ''}`;
       
   
    // const availabilityStatus = row['Available Stock (Male Center, Female center, General Store)'];

    const query = `
      INSERT INTO textbooks ("title", "author", "ISBN", "edition", "availabilityStatus")
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [title, author, isbn, edition, availabilityStatus];

    try {
      await pool.query(query, values);
      // console.log('Row inserted successfully');
    } catch (err) {
      console.error('Error inserting data:', err);
    }
  }
};
const inventriesData = async (data) => {
  for (const row of data) {
    const title = row['Book Title'];         
    const isbn = row['ISBN'];
       const maleCenter = row['Available Stock \r\n(Male Center)'];
       const femaleCenter = row['Available Stock \r\n(Female Center)'];
       const generalStore = row['Available Stock \r\n(General Store)']; 
       // Concatenate the values into a single availabilityStatus field
       const quantityAvailable = `${maleCenter || ''} ${femaleCenter || ''} ${generalStore || ''}`;
       const quantityOnLoan = row[`'Warehouse hardcopy book code '`];
       try {
        // Step 1: Fetch the textbookID from the textbooks table using title or ISBN
        const findTextbookQuery = `
        SELECT "textbookID" FROM textbooks 
        WHERE LOWER(TRIM("title")) = LOWER(TRIM($1)) AND LOWER(TRIM("ISBN")) = LOWER(TRIM($2))
      `;
      const findTextbookValues = [title,isbn];
      
        console.log(findTextbookValues,'VVVVVVVVVVV')
        const textbookResult = await pool.query(findTextbookQuery, findTextbookValues);
       console.log(textbookResult.rows, 'Textbook Results'); // 
       const textbookID = textbookResult.rows.length ? textbookResult.rows[0].textbookID : null;
       if (!textbookID) {
         console.error(`No textbookID found for title: "${title}", ISBN: "${isbn}"`);
       }       
        // If textbookID is found, proceed with the insert
        if (textbookID) {
          // Step 2: Insert availabilityStatus and quantityOnLoan with textbookID
          const insertQuery = `
            INSERT INTO inventories ( "textbookID", "quantityAvailable", "quantityOnLoan")
            VALUES ($1, $2, $3)
          `;
          const insertValues = [textbookID, quantityAvailable , quantityOnLoan];
  
          await pool.query(insertQuery, insertValues);
    
          console.log(`Row inserted successfully for textbookID: ${textbookID}`);

  } else {
    console.error(`textbookID not found for title: ${title}, ISBN: ${isbn}`);
  }

} catch (err) {
  console.error('Error processing row:', err);
}
}
};


const data = readExcelFile();
await TextBookData(data);
await inventriesData(data);







