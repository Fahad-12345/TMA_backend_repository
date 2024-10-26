import * as textbookService from '../services/textbookService.js';

export const add = async (req, res) => {
    try {
        const newTextbook = await textbookService.add(req.body);
        res.status(201).json(newTextbook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const { bookID } = req.params;
        const result = await textbookService.remove(bookID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const setStatus = async (req, res) => {
    try {
        const { bookID } = req.params;
        const { status } = req.body;
        const updatedTextbook = await textbookService.setStatus(bookID, status);
        res.status(200).json(updatedTextbook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { bookID } = req.params;
        const { status } = req.body;
        const updatedTextbook = await textbookService.updateStatus(bookID, status);
        res.status(200).json(updatedTextbook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
