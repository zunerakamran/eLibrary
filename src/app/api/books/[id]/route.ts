import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from "fs/promises";

const prisma = new PrismaClient();
type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
    const { id } = await params
    try {
        const book = await prisma.book.findFirst({
            where: {
                id: Number(id)
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    const { id } = await params
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
        if (!(user.id === book.userId || user.id === 1 || user.username === "superAdmin")) {
            return NextResponse.json({ error: "This book does not belong to you", status: 403 })
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
    const { id } = await params
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, username: string };

    try {
        const book = await prisma.book.findFirst({ where: { id: Number(id) } });
        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        if (!(user.id === book.userId || user.id === 1 || user.username === "superAdmin")) {
            return NextResponse.json({ error: "This book does not belong to you", status: 403 })
        }

        const formData = await req.formData();
        const image = formData.get("image") as File | null;

        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const narrator = formData.get("narrator") as string;
        const publisher = formData.get("publisher") as string;
        const publishedAtString = formData.get("publishedAt") as string;
        const details = formData.get("details") as string;
        const category = formData.get("category") as string;

        // //validation of form
        // if (!title || !author || !narrator || !publisher || !publishedAtString || !details || !category) {
        //     return NextResponse.json({ error: "All fields are required", status: 404 })
        // }

        // if (!/^[A-Za-z\s]{2,40}$/.test(title)) {
        //     return NextResponse.json({ error: "Title should contain letters (2-40)", status: 404 })
        // }

        // if (!/^[A-Za-z\s]{2,40}$/.test(author)) {
        //     return NextResponse.json({ error: "Author should contain letters (2-40)", status: 404 })
        // }

        // if (!/^[A-Za-z\s]{2,40}$/.test(narrator)) {
        //     return NextResponse.json({ error: "Narrator should contain letters (2-40)", status: 404 })
        // }

        // if (!/^[A-Za-z\s]{2,40}$/.test(publisher)) {
        //     return NextResponse.json({ error: "Publisher should contain letters (2-40)", status: 404 })
        // }

        // if (!/^[A-Za-z\s]{2,40}$/.test(details)) {
        //     return NextResponse.json({ error: "Details should contain letters (2-40)", status: 404 })
        // }

        // const publishedAt = new Date(publishedAtString)
        // if (isNaN(publishedAt.getTime()) || publishedAt > new Date() || publishedAt.getFullYear() < 1500) {
        //     return NextResponse.json({ error: "Invalid Date", status: 404 })
        // }
        // const categories = ["fiction", "children", "biography", "arts", "history"]
        // if (!categories.includes(category.toLowerCase())) {
        //     return NextResponse.json({ error: "Invalid category", status: 404 })
        // }

        let imagePath = book.image; // keep old image
        const uploadDir = path.join(process.cwd(), "public");

        if (image && image.size > 0) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const newImageName = `images/books/${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, newImageName);

            await writeFile(filePath, buffer);

            // delete old file
            const oldImagePath = path.join(process.cwd(), "public", book.image.replace(/^\/+/, ""));
            await fs.unlink(oldImagePath).catch(() => { });

            imagePath = `/${newImageName}`;
        }

        const isVerified = user.username === "superAdmin" && user.id === 1;

        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                image: imagePath,
                title,
                category,
                author,
                narrator,
                publisher,
                publishedAt: new Date(publishedAtString),
                details,
                isVerified,
                userId: user.id
            },
        });

        return NextResponse.json({ msg: "Update book successful", updatedBook });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
