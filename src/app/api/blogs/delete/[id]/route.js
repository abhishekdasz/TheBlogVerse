import { NextResponse } from "next/server";
import BlogsModel from "@/models/BlogsModel";
import dbConnect from "@/utils/db";

export async function DELETE(req, {params} ) {
    try 
    {
      await dbConnect();
      const { id } = params;
      await BlogsModel.findByIdAndDelete(id);
      return NextResponse.json({ status:200, success:true, message:'Blog deleted'});
    } catch (error) {
      return NextResponse.json( { error: error.message }, { message: "Error while getting blog!" }, { status: 500 });
    }
  }