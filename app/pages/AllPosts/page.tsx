"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: {
        username: string;
    };
    imageUrl?: string; // Optional image URL for the blog post
}

export default function AllPosts() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Nullable to handle loading state

    // Check login status
    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const response = await fetch("/api/auth/check");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Login status:", data.isLoggedIn); // Debugging login status
                    setIsLoggedIn(data.isLoggedIn);
                } else {
                    console.error("Failed to check login status");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
            }
        }
        checkLoginStatus();
    }, []);

    // Fetch posts
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("/api/posts");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched posts:", data.posts); // Debugging posts
                    setPosts(data.posts);
                } else {
                    console.error("Error fetching posts:", response.status);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    // Handle post deletion
    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
                console.log("Post deleted:", id);
            } else {
                const data = await res.json();
                console.error("Error deleting post:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Show loading screen while checking login and fetching posts
    if (loading || isLoggedIn === null) return <p>Loading...</p>;

    return (
        <div id="posts" className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.length === 0 ? (
                    <p className="font-medium text-xl m-6 p-6">No posts available.</p>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                        >
                            {/* Blog Image */}
                            <div className="w-full h-48 bg-gray-200">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <p className="text-gray-500 flex items-center justify-center h-full">
                                        Image Unavailable
                                    </p>
                                )}
                            </div>

                            {/* Post Content */}
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    By {post.author.username} on{" "}
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-4">{post.content}</p>

                                {/* Conditional Buttons for Update and Delete */}
                                {isLoggedIn && (
                                    <div className="flex justify-end gap-4 mt-4 text-sm">
                                        <button
                                            className="text-blue-500 font-semibold hover:text-blue-700"
                                            onClick={() =>
                                                router.push(`/pages/EditPost/${post.id}`)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="text-red-500 font-semibold hover:text-red-700"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
