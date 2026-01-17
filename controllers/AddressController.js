import AddressModel from "../models/AddressModel.js";

const addAddress = async (req, res) => {
    try {
        const { doorNo, street, city, state, zipCode, location } = req.body;
        if (!doorNo || !street || !city || !state || !zipCode) {
            return res.status(400).json({ message: "All address fields are required" });
        }
        const newAddress = new AddressModel({
            doorNo,
            street,
            city,
            state,
            zipCode,
            location
        });
        await newAddress.save();
        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export { addAddress };