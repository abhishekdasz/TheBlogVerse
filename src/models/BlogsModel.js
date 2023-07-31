import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: 
        {
          type: String,
          required: true,
        },
        description: 
        {
          type: String,
          required: true,
        },
        userInfo: {
          type: mongoose.Types.ObjectId,
          ref: 'UserModel',
          required: true,
        }
    },
    {
        timestamps: true,
    }
);

const BlogsModel = mongoose.models.BlogsModel || mongoose.model("BlogsModel", blogSchema);

export default BlogsModel;