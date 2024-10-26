import { textbookService } from "../services/textbookService.js";

export class textbookController {
    constructor(){
        this.textbookService = new textbookService()
    }

 add = async (req, res) => {
    try {
        const newTextbook = await this.textbookService.add(req.body);
        res.status(201).json(newTextbook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

remove = async (req, res) => {
    try {
        const { bookID } = req.params;
        const result = await this.textbookService.remove(bookID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 setStatus = async (req, res) => {
    try {
        const { bookID } = req.params;
        const { status } = req.body;
        const updatedTextbook = await this.textbookService.setStatus(bookID, status);
        res.status(200).json(updatedTextbook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 updateStatus = async (req, res) => {
    try {
        const { bookID } = req.params;
        const { status } = req.body;
        const updatedTextbook = await this.textbookService.updateStatus(bookID, status);
        res.status(200).json(updatedTextbook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
