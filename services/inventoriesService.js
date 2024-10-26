import { Inventory } from "../models";

// Update inventory quantities
export const updateInventory = async (textbookID, updates) => {
    try {
        const inventory = await Inventory.findOne({ where: { textbookID } });
        if (!inventory) throw new Error('Inventory record not found');

        // Update the quantities (quantityAvailable, quantityOnLoan)
        await inventory.update(updates);
        return inventory;
    } catch (error) {
        throw new Error('Error updating inventory: ' + error.message);
    }
};
