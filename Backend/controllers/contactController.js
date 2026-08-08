const Contact = require("../models/Contact");

const createContact = async (req, res) => {

    try {

       const contact = await Contact.create(req.body);

    console.log(contact);

    res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: contact
    });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createContact
};