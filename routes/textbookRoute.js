import express from 'express';
import { textbookController } from '../controllers/textbookController.js';

const TextBookrouter = express.Router();
const textControll = new textbookController();

TextBookrouter.post("/", textControll.addtextbook);
TextBookrouter.get("/:id", textControll.getTextbookById);
TextBookrouter.put("/:id", textControll.updatetextbook);
TextBookrouter.get("/:id", textControll.deletetextbook);

export default TextBookrouter;
