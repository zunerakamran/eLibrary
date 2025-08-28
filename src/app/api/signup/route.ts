import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
     try {
         const { fullname, email, username, password } = await req.json();
         if (!fullname || !email || !username || !password) {
             return NextResponse.json(
                 { error: "All fields are required" },
                 { status: 400 }
             );
         }

         //Validation of FullName
         if (!/^[A-Za-z\s]{2,40}$/.test(fullname)) {
             return NextResponse.json(
                 { error: "FullName format is not matched" },
                 { status: 400 }
             )
         }

         //Validation of Username
         if (!/^[a-zA-Z0-9_]{8,20}$/.test(username)) {
             return NextResponse.json(
                 { error: "Username format is not matched" },
                 { status: 400 }
             )
         }

         //Validation for Email
         if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
             return NextResponse.json(
                 { error: "Email format is not matched" }
             )
         }

         //Validation for Password
         if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password)) {
             return NextResponse.json(
                 { error: "Password must be strong" },
                 { status: 404 }
             )
         }

         //Check if Email or Username exists in database
         const existingUser = await prisma.user.findFirst({
             where: {
                 OR: [
                     { email: email },
                     { username: username }
                 ]
             },
         });

         if (existingUser) {
             return NextResponse.json({ error: 'Email or Username already exists' }, { status: 409 });
         }

         const hashedPassword= await bcrypt.hash(password,10)

         const newUser = await prisma.user.create({
             data: { fullname: fullname, username:username, email: email, password:hashedPassword },
         });

         return NextResponse.json(
             {message: "New user created", user: newUser}, 
             { status: 201 });
     }
     catch (error) {
         console.log(error)
         return NextResponse.json(
             {error: "Something went wrong"},
             {status:404}
         )
     }
 }