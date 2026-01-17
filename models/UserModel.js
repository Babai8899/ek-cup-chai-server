import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        mobile: {
            type: String,
            trim: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        dob: {
            type: Date,
            default: null,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            default: 'other',
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            trim: true,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;