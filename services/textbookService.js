import { Textbook } from "../models";

// Add a new textbook
export const add = async (textbookData) => {
    try {
        const newTextbook = await Textbook.create(textbookData);
        return newTextbook;
    } catch (error) {
        throw new Error('Error adding textbook: ' + error.message);
    }
};

// Remove a textbook by bookID
export const remove = async (bookID) => {
    try {
        const deletedTextbook = await Textbook.destroy({ where: { bookID } });
        if (!deletedTextbook) throw new Error('Textbook not found');
        return { message: 'Textbook removed successfully' };
    } catch (error) {
        throw new Error('Error removing textbook: ' + error.message);
    }
};

// Set the availability status of a textbook
export const setStatus = async (bookID, status) => {
    try {
        const textbook = await Textbook.findByPk(bookID);
        if (!textbook) throw new Error('Textbook not found');
        textbook.availabilityStatus = status;
        await textbook.save();
        return textbook;
    } catch (error) {
        throw new Error('Error setting status: ' + error.message);
    }
};

// Update the availability status of a textbook
export const updateStatus = async (bookID, status) => {
    try {
        const textbook = await Textbook.findByPk(bookID);
        if (!textbook) throw new Error('Textbook not found');
        textbook.availabilityStatus = status;
        await textbook.save();
        return textbook;
    } catch (error) {
        throw new Error('Error updating status: ' + error.message);
    }
};
