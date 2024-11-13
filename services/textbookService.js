import { text } from "express";
import Textbook from "../models/Textbook.js";
import Course from "../models/Course.js";
export class textbookService {
  // Add a new textbook
  addtextbook = async (req, res) => {
    try {
      const {
        courseID,
        textBooktitle,
        author,
        ISBN,
        edition,
        date_of_publish,
      } = req.body;

      if (
        !courseID ||
        !textBooktitle ||
        !author ||
        !ISBN ||
        !edition ||
        !date_of_publish
      ) {
        return res
          .status(400)
          .json({ error: "All courses attributes are required" });
      }
      const newtextbook = await Textbook.create(req.body);
      if (newtextbook) {
        return newtextbook;
      } else {
        console.error;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getTextbookById = async (textbookID) => {
    try {
      const textbook = await Textbook.findByPk(textbookID);
      console.log(textbook, "textbook");
      return textbook;
      // return res.json(textbook);
    } catch (error) {
      throw new Error("Failed to retrieve textbook");
    }
  };

  updatetextbook = async (req, res) => {
    const { id: textbookID } = req.params;
    console.log(textbookID, "textbook ID");
    try {
      const existingTextbook = await Textbook.findByPk(textbookID);
      if (!existingTextbook) {
        return res.status(404).json({ error: "Patient not found" });
      }
      const updatedTextbook = await Textbook.update(req.body, {
        where: { textbookID },
      });

      return updatedTextbook;

      // Update associated records

      //await Case.update(req.body, { where: { CaseId: id } });

      // const updatedPatient1 = await Patient.findByPk(id);
      res.status(201).json(updatedPatient1);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deletetextbook = async (req, res) => {
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
