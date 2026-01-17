import UserModel from "../models/UserModel.js";
import AddressModel from "../models/AddressModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, '-password'); // Exclude password field
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        
        const usersWithAddresses = await Promise.all(users.map(async (user) => {
            const userObj = user.toObject();
            if (user.address) {
                const address = await AddressModel.findById(user.address);
                userObj.address = address;
            }
            return userObj;
        }));

        res.status(200).json({ users: usersWithAddresses });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateUser = async (req, res) => {
    const username = req.user.username;
    const { name, email, mobile } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const findUserByEmail = await UserModel.findOne({ email });
        if (findUserByEmail && findUserByEmail.username !== username) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const findUserByMobile = await UserModel.findOne({ mobile });
        if (findUserByMobile && findUserByMobile.username !== username) {
            return res.status(400).json({ message: "Mobile number already in use" });
        }

        // Update user fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;

        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const username = req.user.username;
    try {
        const user = await UserModel.findOneAndDelete({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateUserAddress = async (req, res) => {
    const username = req.user.username;
    const { addressId } = req.body;
    if (!addressId) {
        return res.status(400).json({ message: "Address ID is required" });
    }
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.address = addressId;
        await user.save();
        res.status(200).json({ message: "User address updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { getAllUsers,updateUser, deleteUser, updateUserAddress };