import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function adminMiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    if (!token) {
        console.log("Unauthorized")
        return NextResponse.redirect(new URL("/", req.url))
    }
    try {
        const {payload} = await jwtVerify(token, secret)
        if (payload.id === 1 && payload.username === "superAdmin") {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }
    catch (error) {
        return NextResponse.redirect(new URL("/", req.url))
    }
}
export async function authMiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    if (!token) {
        console.log("Unauthorized")
        return NextResponse.redirect(new URL("/", req.url))
    }
    try {
        const {payload} = await jwtVerify(token, secret)
        if (payload) {
            return NextResponse.next()
        }
    } catch (error) {
        return NextResponse.redirect(new URL("/", req.url))
    }
}

export async function middleware(req: NextRequest) {
    // Apply middleware by route
    const protectedRoutes = [
        "/add-book",
        "/my-books",
        "/update",
        "/pending-books",
    ];

    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        return await authMiddleware(req);
    }

    if (req.nextUrl.pathname.startsWith("/verified-books")) {
        return await adminMiddleware(req);
    }

    return NextResponse.next();
}
