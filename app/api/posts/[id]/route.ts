import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params; // Get the id from the route parameters

    if (!id) {
        return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    try {
        const post = await prisma.post.delete({
            where: {
                id: parseInt(id), // Convert id to integer if it's a number field
            },
        });

        return NextResponse.json({ message: "Post deleted successfully", postInfo: post }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Error deleting the post", error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Disconnect the Prisma client
    }
};

//update method
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { title, content } = await request.json(); // Don't destructure id here since it's in params

    try {
        // Update the post using the ID from the URL params
        const updatedPost = await prisma.post.update({
            where: {
                id: parseInt(params.id), // Ensure you're using a number if id is an integer
            },
            data: {
                title: title,
                content: content,
            },
        });

        return NextResponse.json({
            message: "Post updated successfully.",
            post: updatedPost, // Return the updated post data
        });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({
            message: "Error updating the post",
        }, { status: 500 });
    }
};

