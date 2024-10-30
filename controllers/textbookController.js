import { textbookService } from "../services/textbookService.js";

export class textbookController {
    constructor(){
        this.textbookService = new textbookService()
    }

    addtextbook = async (req, res) => {
        // console.log(req.body,'reqq')
        try {
            const addcourse = await this.textbookService.addtextbook(req);
            res.status(200).json(addcourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    getTextbookById = async (req, res) => {
        const { id: textbookID } = req.params; 
        console.log(textbookID, 'reqq');
        
        if (!textbookID) {
            return res.status(400).json({ error: "textbook ID is required" });
        }
    
        try {
            const textbook = await this.textbookService.getTextbookById(textbookID); 
            if (textbook) {
                res.status(200).json(textbook);
            } else {
                res.status(404).json({ error: "textbook not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    
    updatetextbook = async (req, res) => {
        // console.log(req.body,'Updatereqq')
        try {
            const updateCourse = await this.textbookService.updatetextbook(req);
            res.status(200).json(updateCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    deletetextbook = async (req, res) => {
        console.log(req.body,'reqq')
        try {
            const deleteCourse = await this.textbookService.deletetextbook(req);
            res.status(200).json(deleteCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
