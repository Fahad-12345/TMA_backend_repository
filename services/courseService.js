import sequelize from "../config/db.js";
import Course from "../models/Course.js";
import Textbook from "../models/Textbook.js";
import Inventory from "../models/Inventory.js";
import { AvailabilityStatus, TextbookType } from "../shared/common.js";

export class courseService {
  addcourse = async (req, res) => {
    try {
      const { courseName, courseCode, semester, year } = req.body;

      if (!courseName || !courseCode || !semester || !year) {
        return res
          .status(400)
          .json({ error: "All courses attributes are required" });
      }
      const newCourse = await Course.create(req.body);
      if (newCourse) {
        return newCourse;
      } else {
        console.error;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getcourseById = async (courseID) => {
    try {
      const course = await Course.findByPk(courseID);

      return course;
    } catch (error) {
      throw new Error("Failed to retrieve course");
    }
  };

  updateCourse = async (req, res) => {
    const { id: courseID } = req.params;
    console.log(courseID, "update ID");
    try {
      const existingCourse = await Course.findByPk(courseID);
      if (!existingCourse) {
        return res.status(404).json({ error: "Patient not found" });
      }
      const updatedCourse = await Course.update(req.body, {
        where: { courseID },
      });

      return updatedCourse;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteCourse = async (req, res) => {
    try {
      const id = req.params.id;
      console.log("chopra", id);
      // const existingPatient = await Patient.findByPk(id);
      // if (!existingPatient) {
      //   res.status(404).json({ error: "Patient not found" });
      // }
      await Inventory.destroy({ where: { InventoryID: id } });
      await Textbook.destroy({ where: { textbookID: id } });
      await Course.destroy({ where: { courseID: id } });
      return { Inventory, Textbook, Course };
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /////////////////////////////////////////

  getListingsFromTables = async (req, res) => {
    const isNotEmpty = (data) => {
      return data !== undefined && data !== null && data !== "";
    };
    // console.log(req,'servvvv')
    try {
      const { page, pageSize } = req.query;
      if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
        return res
          .status(400)
          .json({ message: "Invalid pagination parameters" });
      }
      const offset = (page - 1) * pageSize;
      const filters = req.query;

      // console.log(filters,'filtersss');
      let conditions = "";
      conditions =
        conditions +
        (isNotEmpty(filters.course_id)
          ? ` AND c."courseID" = ${filters.course_id}`
          : "");

      conditions =
        conditions +
        (isNotEmpty(filters.course_name)
          ? ` AND c."courseName" LIKE '${filters.course_name}'`
          : "");
      conditions =
        conditions +
        (isNotEmpty(filters.assigned_book)
          ? ` AND textbook."textBooktitle" LIKE '${filters.assigned_book}'`
          : "");

      if (
        isNotEmpty(filters.availabilityStatus) &&
        (filters.availabilityStatus === AvailabilityStatus.AVAILABLE ||
          filters.availabilityStatus === AvailabilityStatus.NON_AVAILABLE)
      ) {
        conditions += ` AND textbook."availabilityStatus" LIKE '${filters.availabilityStatus}'`;
      }

      if (
        isNotEmpty(filters.textbookType) &&
        filters.textbookType === TextbookType.ebook
      ) {
        conditions += ` AND textbook."e_book" = true`;
      }
      if (
        isNotEmpty(filters.textbookType) &&
        filters.textbookType === TextbookType.hardcopy
      ) {
        conditions += ` AND textbook."hard_copy" = true`;
      }
      if (
        isNotEmpty(filters.textbookType) &&
        filters.textbookType === TextbookType.both
      ) {
        conditions += ` AND textbook."e_book" = true AND textbook."hard_copy" = true `;
      }

      let whereClause = "";
      if (conditions !== "") {
        let outputString = conditions.replace(/^ AND\s*/, "");
        whereClause = `WHERE ${outputString}`;
      }

      const sqlQuery = `
         SELECT 
         c."courseID" AS course_id,
		     c."courseCode" AS Course_Code,
		     c."courseName" AS Course_Name,
         c."semester" AS Semester,
         c."year" AS enrollment_year,
         textbook."textbookID" AS textbook_id,
		     textbook."textBooktitle" AS Assign_Book,
         textbook."edition" AS edition,
				textbook."author" AS author,
		     textbook."ISBN" AS isbn,
		     textbook."latest_version" AS latest_version,
		     textbook."old_version" AS old_version, 
				textbook."date_of_publish" AS date_of_publish,
        inv."InventoryID" AS inventory_id,
		    inv."quantityAvailable",
		    inv."quantityOnLoan"
        FROM courses as C
        LEFT JOIN textbooks as textbook ON C."courseID" = textbook."courseID"
        LEFT JOIN inventories as inv ON textbook."textbookID" = inv."textbookID"
        ${whereClause}
        ORDER BY
		    c."courseID"
        LIMIT ${pageSize} OFFSET ${offset};
      `;

      // console.log("our query", sqlQuery);

      const listings = await Course.sequelize.query(sqlQuery);
      const newlistings = listings[0];
      // console.log("=======", newlistings);
      return newlistings;
      // res.status(200).json(newlistings);
    } catch (error) {
      console.error("Error getting listing :", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
