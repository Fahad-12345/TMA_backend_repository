import express from 'express';
import { add, remove, setStatus, updateStatus } from '../controllers/textbookController.js';

const router = express.Router();

router.post('/add', add);               // Add a new textbook
router.delete('/:bookID', remove);       // Remove a textbook by bookID
router.put('/status/:bookID', setStatus); // Set availability status
router.patch('/status/:bookID', updateStatus); // Update availability status

export default router;
