import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// DELETE method - deletes a post by ID
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    try {
        const post = await prisma.post.delete({
            where: { id: parseInt(id, 10) }, // Ensure id is an integer
        });

        return NextResponse.json(
            { message: "Post deleted successfully", postInfo: post },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { message: "Error deleting the post", error: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Ensure disconnection
    }
};

// GET method - fetches a single post by ID
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (post) {
            return NextResponse.json(
                { status: 201, message: "Post fetched successfully", post },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }
    } catch (error: any) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            { message: "Error fetching post", error: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
};

// PUT method - updates a post by ID
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { title, content } = await request.json();

    if (!title || !content) {
        return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }

    try {
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id, 10) },
            data: { title, content },
        });

        return NextResponse.json(
            { message: "Post updated successfully", post: updatedPost },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating post:", error);
        return NextResponse.json(
            { message: "Error updating the post", error: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
};

// Function to fetch all posts (if needed, e.g., for a list of posts)
export async function getAllPosts() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(
            { status: 201, message: "Posts fetched successfully", posts },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { message: "Error fetching posts", error: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
