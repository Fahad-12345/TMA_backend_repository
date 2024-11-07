import { Router } from "express";
import { inventoriesController } from "../controllers/inventoriesController.js";

const InventoryRouter = Router();
const invController = new inventoriesController();

InventoryRouter.post("/", invController.addInventory);
InventoryRouter.get("/:id", invController.getInventoryById);
InventoryRouter.put("/:id", invController.updateInventory);
InventoryRouter.get("/:id", invController.deleteInventory);

export default InventoryRouter;
