import express from 'express';
import { textbookController } from '../controllers/textbookController.js';

const TextBookrouter = express.Router();
const textControll = new textbookController();

TextBookrouter.post('/add', textControll.add);               // Add a new textbook
TextBookrouter.delete('/:bookID', textControll.remove);       // Remove a textbook by bookID
TextBookrouter.put('/status/:bookID', textControll.setStatus); // Set availability status
TextBookrouter.patch('/status/:bookID', textControll.updateStatus); // Update availability status

export default TextBookrouter;
