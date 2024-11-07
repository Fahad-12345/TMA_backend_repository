import Inventory from "../models/Inventory.js";

export class inventoriesService {
  addInventory = async (req, res) => {
    try {
      const { textbookID, quantityAvailable, quantityOnLoan } = req.body;

      if (!textbookID || !quantityAvailable || !quantityOnLoan) {
        return res
          .status(400)
          .json({ error: "All courses attributes are required" });
      }
      const newinventory = await Inventory.create(req.body);
      if (newinventory) {
        return newinventory;
      } else {
        console.error;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getInventoryById = async (InventoryID) => {
    try {
      const inventory = await Inventory.findByPk(InventoryID);
      console.log(inventory, "inventory");
      return inventory;
      // return res.json(textbook);
    } catch (error) {
      throw new Error("Failed to retrieve inventory");
    }
  };

  updateInventory = async (req, res) => {
    const { id: InventoryID } = req.params;
    console.log(InventoryID, "update ID");
    try {
      const existingInventory = await Inventory.findByPk(InventoryID);
      if (!existingInventory) {
        return res.status(404).json({ error: "inventory not found" });
      }
      const updatedInventory = await Inventory.update(req.body, {
        where: { InventoryID },
      });

      return updatedInventory;

      // Update associated records

      //await Case.update(req.body, { where: { CaseId: id } });

      // const updatedPatient1 = await Patient.findByPk(id);
      res.status(201).json(updatedPatient1);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteInventory = async (req, res) => {
    try {
      const id = req.params.id;
      console.log("chopra", id);
      // const existingPatient = await Patient.findByPk(id);
      // if (!existingPatient) {
      //   res.status(404).json({ error: "Patient not found" });
      // }
      await Patient.update({ isDeleted: true }, { where: { id: id } });
      await cases.update({ isDeleted: true }, { where: { patientId: id } });
      await Appointment.update({ isDeleted: true }, { where: { CaseId: id } });
      await res.status(200).send({ Patient, cases, Appointment });
      // console.log(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
