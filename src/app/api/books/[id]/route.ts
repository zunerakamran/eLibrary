import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from "fs/promises";

const prisma = new PrismaClient();
interface RouterContext {
    params: {
        id: string
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) 
    {
        const id = Number(params.id)
        if (Number.isNaN(id)) {
            return NextResponse.json(
                { error: "Book id must be a valid number" },
                { status: 400 }
            );
        }
        try {
            const book = await prisma.book.findFirst({
                where: {
                    id: id
                }
            })
            if (!book) {
                return NextResponse.json({ error: "No book of this id found", status: 404 })
            }
            return NextResponse.json({ book: book })
        }
        catch (error) {
            return NextResponse.json({ error: "Something went wrong", status: 404 })
        }
    }

    export async function DELETE(req: NextRequest, { params }: RouterContext) {
        const id = Number(params.id)
        if (Number.isNaN(id)) {
            return NextResponse.json(
                { error: "Book id must be a valid number" },
                { status: 400 }
            );
        }
        try {
            const token = req.cookies.get("token")?.value
            if (!token) {
                return NextResponse.json({ error: "Unauthorized", status: 404 })
            }
            const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, username: string }
            const book = await prisma.book.findFirst({
                where: {
                    id: Number(id)
                }
            })
            if (!book) {
                return NextResponse.json({ error: "Book of this id not available" })
            }
            if (user.id !== book.userId) {
                return NextResponse.json({ error: "This book does not belongs to you", status: 404 })
            }
            const imagePath = path.join(process.cwd(), "public", book.image);
            await prisma.book.delete({
                where: {
                    id: Number(id),
                }
            })
            await fs.unlink(imagePath);
            return NextResponse.json({ msg: "Book deleted successfully", status: 200 })
        }
        catch (error) {
            return NextResponse.json({ error: "Something went wrong", status: 404 })
        }
    }

    export async function PATCH(req: NextRequest, { params }: RouterContext) {
        const id = Number(params.id)
        if (Number.isNaN(id)) {
            return NextResponse.json(
                { error: "Book id must be a valid number" },
                { status: 400 }
            );
        }
        const token = req.cookies.get("token")?.value
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 404 })
        }

        const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, username: string }
        try {
            const book = await prisma.book.findFirst({
                where: {
                    id: id
                }
            })
            if (!book) {
                return NextResponse.json({ error: "Book of this id is not found", status: 404 })
            }
            const formData = await req.formData()
            const image = formData.get("image") as File;
            const title = formData.get("title") as string;
            const author = formData.get("author") as string;
            const narrator = formData.get("narrator") as string;
            const publisher = formData.get("publisher") as string;
            const publishedAtString = formData.get("publishedAt") as string;
            const details = formData.get("details") as string;
            const category = formData.get("category") as string;

            console.log(image)

            const oldImagePath = path.join(process.cwd(), "public", book.image)
            await fs.unlink(oldImagePath).catch(() => {
                console.error("Something went wrong while deleting old image");
            });

            const bytes = await image.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const imageName = `/images/books/${Date.now()}-${image.name}`;
            const uploadDir = path.join(process.cwd(), "public");
            const filePath = path.join(uploadDir, imageName);
            await writeFile(filePath, buffer);
            const imagePath = imageName

            let isVerified = false
            if (user.username === "superAdmin" && user.id === 1) {
                isVerified = true
            }
            else {
                isVerified = false
            }

            const updateBook = await prisma.book.update({
                where: { id },
                data: {
                    image: imagePath,
                    title,
                    author,
                    narrator,
                    publisher,
                    publishedAt: new Date(publishedAtString), // Ensure this is a Date if it's a Date field
                    details,
                    category,
                    isVerified: isVerified
                },
            });
            return NextResponse.json({ msg: "Update book successful", updateBook })

        }
        catch (error) {
            return NextResponse.json({ error: "Something went wrong", status: 404 })
        }

    }