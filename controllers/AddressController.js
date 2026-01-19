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
};

const getAddressById = async (req, res) => {
    const { addressId } = req.params;
    try {
        const address = await AddressModel.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ address });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deleteAddress = async (req, res) => {
    const { addressId } = req.params;
    try {
        const address = await AddressModel.findByIdAndDelete(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const { doorNo, street, city, state, zipCode } = req.body;
    try {
        const address = await AddressModel.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        // Update address fields if provided
        if (doorNo) address.doorNo = doorNo;
        if (street) address.street = street;
        if (city) address.city = city;
        if (state) address.state = state;
        if (zipCode) address.zipCode = zipCode;
        await address.save();
        res.status(200).json({ message: "Address updated successfully", address });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateAddressLocation = async (req, res) => {
    const { addressId } = req.params;
    const { location } = req.body;
    try {
        const address = await AddressModel.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }
        address.location = location;
        await address.save();
        res.status(200).json({ message: "Address location updated successfully", address });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export { addAddress, getAddressById, deleteAddress, updateAddress, updateAddressLocation };