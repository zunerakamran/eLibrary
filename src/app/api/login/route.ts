import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { username, password } = await req.json()
    const existingUser = await prisma.user.findFirst({ where: { username: username } });
    if (!existingUser) {
        return NextResponse.json({error:"User doesnot exist", status: 404})
    }
    const isPasswordValid= bcrypt.compare(existingUser.password, password)
    if(!isPasswordValid){
        return NextResponse.json({error: "Password is invalid", status:401})
    }
    const token= jwt.sign(
        { id: existingUser.id, username: existingUser.username }, 
        process.env.JWT_SECRET!, 
        { expiresIn: "1d" }) 
    const response= NextResponse.json({message:" User logged in successfully", status: 200})
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
    });
    return response;
}