import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        doorNo: {
            type: String,
            required: true,
            trim: true,
        },
        street: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        zipCode: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            latitude: {
                type: Number,
                required: true,
                default: 0,
            },
            longitude: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    },
    { timestamps: true }
);

const AddressModel = mongoose.model('Address', addressSchema);

export default AddressModel