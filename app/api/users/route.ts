import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



export async function POST(request: NextRequest, response: NextResponse){
    const prisma = new PrismaClient();

    try {
        const {username, email, password, posts} = await response.json();
        const data = await prisma.user.create({
            data : {
                username : username,
                email : email,
                password: password,
                posts : posts,
                
            }
        })
        return NextResponse.json({
            status: 200,
            message: "User created",
            userInfo : data,
        })
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message : "Error creating user"
        })
        
    }


}