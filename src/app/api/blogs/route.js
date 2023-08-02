import { NextResponse } from "next/server";
import BlogsModel from "@/models/BlogsModel";
import dbConnect from "@/utils/db";

export async function POST(req)
{
    try
    {
        const { title, description, userInfo } = await req.json();
        await dbConnect();

        await BlogsModel.create({ title, description, userInfo });
        return NextResponse.json({message: 'Blog created successfully'}, {status: 200});
    }
    catch(error)
    {
        return NextResponse.json(
            {messsage: "Server error"},
            {status: 500},
        )
    }
}

export async function GET()
{
    try 
    {
        await dbConnect();
        const blogs = await BlogsModel.find().populate('userInfo').sort({ createdAt: -1 });
        return NextResponse.json({blogs});
    }
    catch(error)
    {
        return NextResponse.json(
            {messsage: "Server error"},
            {status: 500},
        )
    }
}