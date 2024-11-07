import { inventoriesService } from "../services/inventoriesService.js";
export class inventoriesController {
  constructor() {
    this.invService = new inventoriesService();
  }

  addInventory = async (req, res) => {
    // console.log(req.body,'reqq')
    try {
      const addcourse = await this.invService.addInventory(req);
      res.status(200).json(addcourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getInventoryById = async (req, res) => {
    const { id: textbookID } = req.params;
    console.log(textbookID, "reqq");

    if (!textbookID) {
      return res.status(400).json({ error: "invetory ID is required" });
    }

    try {
      const textbook = await this.invService.getInventoryById(textbookID);
      if (textbook) {
        res.status(200).json(textbook);
      } else {
        res.status(404).json({ error: "inventory not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateInventory = async (req, res) => {
    // console.log(req.body,'Updatereqq')
    try {
      const updateCourse = await this.invService.updateInventory(req);
      res.status(200).json(updateCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteInventory = async (req, res) => {
    console.log(req.body, "reqq");
    try {
      const deleteCourse = await this.invService.deleteInventory(req);
      res.status(200).json(deleteCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
