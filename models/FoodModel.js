import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        type: {
            type: String,
            enum: ['veg', 'non-veg'],
            required: true,
        },
        tag: {
            type: String,
            trim: true,
            enum: ['BEST_SELLER', 'CHEF_SPECIAL'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel;
