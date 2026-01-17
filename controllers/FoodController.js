import FoodModel from "../models/FoodModel.js";

const addFood = async (req, res) => {
    try {
        const { name, description, price, category, type, tag, image } = req.body;

        if (!name || !price || !category || !type) {
            return res.status(400).json({ message: "Name, price, category, and type are required fields" });
        }

        const existingFood = await FoodModel.findOne({ name });
        if (existingFood) {
            return res.status(400).json({ message: "Food item with this name already exists" });
        }

        const newFood = new FoodModel({
            name,
            description,
            price,
            category,
            type,
            tag,
            image
        });
        await newFood.save();
        res.status(201).json({ message: "Food added successfully", food: newFood });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getFoods = async (req, res) => {
    try {
        const foods = await FoodModel.find();
        if (foods.length === 0) {
            return res.status(404).json({ message: "No food items found" });
        }
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getFoodByName = async (req, res) => {
    try {
        const { name } = req.params;
        const food = await FoodModel.findOne({ name });
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getFoodByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const foods = await FoodModel.find({ category });
        if (foods.length === 0) {
            return res.status(404).json({ message: "No food items found in this category" });
        }
        res.status(200).json(foods);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getFoodByType = async (req, res) => {
    try {
        const { type } = req.params;
        const foods = await FoodModel
            .find({ type });
        if (foods.length === 0) {
            return res.status(404).json({ message: "No food items found of this type" });
        }
        res.status(200).json(foods);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await FoodModel.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFood = await FoodModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ message: "Food updated successfully", food: updatedFood });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await FoodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export { addFood, getFoods, getFoodByName, getFoodByCategory, getFoodByType, getFoodById, updateFood, deleteFood };