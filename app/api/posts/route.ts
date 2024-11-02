import { NextRequest, NextResponse } from "next/server";
import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request : NextRequest){
    try {

        const {title, content, authorId} = await request.json();

       // Create the post and connect it to the existing user
       const data = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: {
                connect: { id: authorId }, // Connect the existing user by ID
            },
        },
    });
        return NextResponse.json({
            status: 201,
            message: "post created",
            postInfo : data,
        })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message : "Error creating post",
            error: error.message, // Return the error message for more insight
        })
        
    }
    finally {
        await prisma.$disconnect(); // Disconnect the Prisma client
    }

}

export async function GET() {
    try {
        const posts = await  prisma.post.findMany({
            include: {
                author: {
                    select: { username: true },
                },
            },
        });
        return NextResponse.json({
            status: 201,
            message: "Posts fetched successfully",
            posts: posts, // Include the posts data in the response
        });
    } catch (error: any) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({
            status: 500,
            message: "Error fetching posts",
            error: error.message // Optionally include the error message for debugging
        });
    } finally {
        await prisma.$disconnect();
    }
}
