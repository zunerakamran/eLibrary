import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import { error } from 'console';
const prisma = new PrismaClient()
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params
    const token = req.cookies.get("token")?.value
    if (!token) {
        return NextResponse.json({ error: "User not authenticated", status: 404 })
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, username: string }
    console.log(user.id, user.username)
    if (user.id === 1 && user.username === "superAdmin") {
        const book = await prisma.book.update({
            where: { id: Number(id) },
            data: { isVerified: true }
        })
        return NextResponse.json({ msg: "Book is updated", book: book, status: 202 })
    }
    else {
        return NextResponse.json({ error: "Only admin can access", status: 404 })
    }

}