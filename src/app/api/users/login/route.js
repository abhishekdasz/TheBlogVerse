import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function POST(req)
{
    try
    {
        const { email, pwd  } = await req.json();
        await dbConnect();

        const userInfo = await UserModel.findOne({ email });
        if(!userInfo)
        {
            return NextResponse.json(
                { error: "User doen't exists, please Register first" },
                { status: 404, statusText:'User does not exist, please Register first' }
            )
        }

        // decrypting password
        const validPassword = await bcryptjs.compare(pwd, userInfo.pwd);
        if (!validPassword) 
        {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 401, statusText:'Invalid Password' }
            );
        } 
        // create token data
        const tokenData = {
            id: userInfo._id,
            username: userInfo.username,
            email: userInfo.email,
            phone: userInfo.phone,
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        const response = NextResponse.json({
            message:"Login successful",
            success: true,
            status: 200
        })
        // set cookies
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    }
    catch(error)
    {
        return NextResponse.json(
            {messsage: "Server error"},
            {status: 500, statusText:'Server error'},
        )
    }
}
