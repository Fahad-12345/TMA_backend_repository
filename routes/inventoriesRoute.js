import { Router } from 'express';
import { inventoriesController } from '../controllers/inventoriesController.js';

const InventoryRouter = Router();
const invController = new inventoriesController(); 

// Update inventory by textbookID
InventoryRouter.put('/:textbookID', invController.updateInventory);

export default InventoryRouter;
