import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import { NextResponse } from 'next/server';

import jwt  from "jsonwebtoken";

export async function GET(request) 
{
    try 
    {
        await dbConnect();
        const userId = await getDataFromToken(request);
        const user = await UserModel.findOne({_id: userId}).select("-password");
        return NextResponse.json(
            { message: 'user found', data: user }
        )
    }
    catch(error)
    {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }, 
        )
    }
}

export const getDataFromToken = (request) => {
    try
    {
        const token = request.cookies.get('token').value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken.id;
    }
    catch(error)
    {
        throw new Error(error.message);
    }
}