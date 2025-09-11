import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import  jwt  from 'jsonwebtoken';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const books = await prisma.book.findMany({
        include: { user: true },
    });
    return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
    try {
        //get the form data
        const formData = await req.formData()
        const image = formData.get("image") as File
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const narrator = formData.get("narrator") as string;
        const publisher = formData.get("publisher") as string;
        const publishedAtString = formData.get("publishedAt") as string;
        const details = formData.get("details") as string;
        const category= formData.get("category") as string;

        //decode the payload
        const token= req.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json({error: "Unauthorized", status:404})
        }
        const user= jwt.verify(token, process.env.JWT_SECRET!) as {id: number, username: string}
        //fetch id and username from it
        const userid= user.id;
        const username= user.username

        //if user is admin
        const isVerified = userid === 1 && username === "superAdmin";

        //form validation
        if (!image) {
            return NextResponse.json({ error: "Image is required", status: 404 })
        }

        if (!title || !author || !narrator || !publisher || !publishedAtString || !details || !category) {
            return NextResponse.json({ error: "All fields are required", status: 404 })
        }

        if (!/^[A-Za-z\s]{2,40}$/.test(title)) {
            return NextResponse.json({ error: "Title should contain letters (2-40)", status: 404 })
        }

        if (!/^[A-Za-z\s]{2,40}$/.test(author)) {
            return NextResponse.json({ error: "Author should contain letters (2-40)", status: 404 })
        }

        if (!/^[A-Za-z\s]{2,40}$/.test(narrator)) {
            return NextResponse.json({ error: "Narrator should contain letters (2-40)", status: 404 })
        }

        if (!/^[A-Za-z\s]{2,40}$/.test(publisher)) {
            return NextResponse.json({ error: "Publisher should contain letters (2-40)", status: 404 })
        }

        if (!/^[A-Za-z\s]{2,40}$/.test(details)) {
            return NextResponse.json({ error: "Details should contain letters (2-40)", status: 404 })
        }

        const publishedAt = new Date(publishedAtString)
        if (isNaN(publishedAt.getTime()) || publishedAt > new Date() || publishedAt.getFullYear() < 1500) {
            return NextResponse.json({ error: "Invalid Date", status: 404 })
        }
        const categories= ["fiction", "children", "biography", "arts", "history"]
        if(!categories.includes(category.toLowerCase())){
            return NextResponse.json({ error: "Invalid category", status: 404 })
        }

        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const imageName= `${Date.now()}-${image.name}`;
        const uploadDir = path.join(process.cwd(), "public/images/books");
        const filePath = path.join(uploadDir, imageName);
        await writeFile(filePath, buffer);
 
        const newBook= await prisma.book.create({
            data:{
                image: `/images/books/${imageName}`,
                title: title,
                category: category,
                author: author,
                narrator: narrator,
                publisher: publisher,
                publishedAt: publishedAt,
                details: details,
                isVerified: isVerified,
                userId:userid
            }
        })
        return NextResponse.json({ message: "New Book created", status: 201 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({error:"Something went wrong", status:404})
    }
}

