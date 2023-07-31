import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: 
        {
            type: String,
            required: true,
        },
        email: 
        {
            type: String,
            required: true,
        },
        phone: 
        {
            type: String,
            required: true,
        },
        pwd:
        {
            type: String,
            required: true,
        },
        blogsInfo:[
            {
                type: mongoose.Types.ObjectId,
                ref: 'BlogsModel',
            }
        ]
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;