import * as inventoryService from '../services/inventoryService.js';

export const updateInventory = async (req, res) => {
    try {
        const { textbookID } = req.params;
        const updates = req.body;

        // Call the service to update the inventory
        const updatedInventory = await inventoryService.updateInventory(textbookID, updates);
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
