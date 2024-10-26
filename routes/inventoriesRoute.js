import express from 'express';
import { updateInventory } from '../controllers/inventoryController.js';

const router = express.Router();

// Update inventory by textbookID
router.put('/:textbookID', updateInventory);

export default router;
