import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
export async function middleware(req:NextRequest){
    const token= req.cookies.get("token")?.value
    if(!token){
        console.log("Token does not exist")
        return NextResponse.redirect(new URL("/", req.url))
    }
    try{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jose.jwtVerify(token, secret);
        return NextResponse.next()
    }catch(error){
         return NextResponse.redirect(new URL("/", req.url))
    }
}

export const config = {
  matcher: ["/add-book", "/my-books", "/update"],
};