const Service = require("../models/Service");

// GET all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });

    } catch (error) {
        console.error("Get Services Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch services"
        });
    }
};

// CREATE service
const createService = async (req, res) => {
    try {
        const { title, description, icon } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const service = await Service.create({
            title,
            description,
            icon
        });

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: service
        });

    } catch (error) {
        console.error("Create Service Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create service"
        });
    }
};

module.exports = {
    getServices,
    createService
};