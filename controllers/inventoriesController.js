import { inventoriesService } from "../services/inventoriesService.js";
export class inventoriesController {
    constructor() {
        this.invService = new inventoriesService
    }


 updateInventory = async (req, res) => {
    try {
        const { textbookID } = req.params;
        const updates = req.body;

        // Call the service to update the inventory
        const updatedInventory = await this.invService.updateInventory(textbookID, updates);
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
