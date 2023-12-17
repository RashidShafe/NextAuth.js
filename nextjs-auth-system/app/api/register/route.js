import User from "@/models/User"
import connectDB from "@/config/db"
import bcrypt from 'bcryptjs'

import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { username, email, password, confirmPassword } = await req.json()

    if (password !== confirmPassword) {
        return NextResponse.json({ error: "Password Not Matched"}, { status: 400 })
        // return new NextResponse(JSON.stringify({ error: "Password Not Matched" }, { status: 400 }))
    }

    await connectDB();

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return NextResponse.json({ error: "User exist"}, { status: 400 })
        // return new NextResponse(JSON.stringify({ error: "User exist" }, { status: 400 }))
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    
    const newUser = new User(
        {
            username, email, password: hashedPassword
        }
    )

    try {
        await newUser.save()
        return new NextResponse('User successfully registered', { status: 201 })
    } catch (error) {
        console.log("error")
        return new NextResponse(error, { status: 500 })
    }
}