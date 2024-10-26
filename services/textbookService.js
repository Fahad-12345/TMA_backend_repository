import  Textbook  from "../models/Textbook.js";

export class textbookService {
// Add a new textbook
 add = async (textbookData) => {
    try {
        const newTextbook = await Textbook.create(textbookData);
        return newTextbook;
    } catch (error) {
        throw new Error('Error adding textbook: ' + error.message);
    }
};

// Remove a textbook by bookID
 remove = async (bookID) => {
    try {
        const deletedTextbook = await Textbook.destroy({ where: { bookID } });
        if (!deletedTextbook) throw new Error('Textbook not found');
        return { message: 'Textbook removed successfully' };
    } catch (error) {
        throw new Error('Error removing textbook: ' + error.message);
    }
};

// Set the availability status of a textbook
 setStatus = async (bookID, status) => {
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
 updateStatus = async (bookID, status) => {
    try {
        const textbook = await Textbook.findByPk(bookID);
        if (!textbook) throw new Error('Textbook not found');
        textbook.availabilityStatus = status;
        await textbook.save();
        return textbook;
    } catch (error) {
        throw new Error('Error updating status: ' + error.message);
    }
}
}
