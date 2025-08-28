import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
    const token= req.cookies.get("token")?.value
    if(!token){
        return NextResponse.json({error:"Unauthorized", status: 404})
    }
    try{
       const user= jwt.verify(token, process.env.JWT_SECRET!) as {id: number, username: string}
       return NextResponse.json(user)
    }
    catch(error){
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
} 