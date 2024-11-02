"use client";
// pages/searchPost.tsx

import { useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
}

export default function SearchPost() {
    const [postId, setPostId] = useState<string>("");
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSearch = async () => {
        if (!postId) {
            setError("Please enter a Post ID.");
            return;
        }

        setLoading(true);
        setError("");
        setPost(null);

        try {
            const response = await fetch(`/api/posts/${postId}`);
            if (!response.ok) {
                throw new Error("Post not found or an error occurred.");
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Confirm the structure of the response

            // Adjust `data.post` based on the actual structure of the response
            if (data.post) {
                setPost(data.post); // Use `data.post` if the response contains a single post object
            } else if (data.posts) {
                setPost(data.posts); // Use `data.posts` if the response wraps the post in `posts`
            } else {
                setError("No post data returned.");
            }
        } catch (error: any) {
            setError(error.message || "Error fetching post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Search for a Post</h2>
                
                <input
                    type="text"
                    placeholder="Enter Post ID"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button
                    onClick={handleSearch}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {loading ? "Searching..." : "Search"}
                </button>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {post && (
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Post Details</h3>
                        <p><strong>ID:</strong> {post.id}</p>
                        <p><strong>Title:</strong> {post.title}</p>
                        <p><strong>Content:</strong> {post.content}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
