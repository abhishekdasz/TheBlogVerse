import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import bcryptjs from 'bcryptjs';

export async function POST(req)
{
    try
    {
        const { username, email, phone, pwd  } = await req.json();
        await dbConnect();

        const userInfo = await UserModel.findOne({ email });
        if(userInfo)
        {
            return NextResponse.json(
                { error: "User already exists, please Login" },
                { status: 400 }
            )
        }

        // encrypting password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(pwd, salt);

        await UserModel.create({ username, email, phone, pwd: hashedPassword });
        return NextResponse.json({message: 'User registerred successfully'}, {status: 200});
    }
    catch(error)
    {
        return NextResponse.json(
            {messsage: "Server error"},
            {status: 500},
        )
    }
}
