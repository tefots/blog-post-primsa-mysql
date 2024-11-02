"use client"; // Ensure the component can use client-side features

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useParams from next/navigation
import axios from "axios";

interface Post {
    id: number;
    title: string;
    content: string;
}

export default function EditPost() {
    const { postId } = useParams(); // Get id directly from useParams
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const router = useRouter();

  

    const fetchPostDetails =  async() => { 
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    setPost(response.data.post)
    return response.data
  } catch (error) {
    console.log(error);
    
  }
    }

    useEffect(() => {
        fetchPostDetails();
        // const fetchPost = async () => {
        //     if (!id) return; // Ensure ID is available before fetching

        //     console.log(`Fetching post with ID: ${id}`);
            
        //     setError("");

        //     try {
        //         const response = await fetch(`/api/posts/${id}`);
        //         console.log(response);
                
        //         if (!response.ok) {
        //             throw new Error("Post not found or an error occurred.");
        //         }

        //         const data = await response.json();
        //         console.log(data?.post);
        //         if (!data.posts) {
        //             throw new Error("Post data not found.");
        //         }

        //         setPost(data.post);
        //         setLoading(false);
        //     } catch (error: any) {
        //         setError(error.message || "Error fetching post");
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchPost();
    }, []);

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!post) {
            setError("No post data to update.");
            return;
        }

        try {
            // const response = await fetch(`/api/posts/${post.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         title: post.title,
            //         content: post.content,
            //     }),
            // });

            // if (!response.ok) {
            //     throw new Error("Error updating post.");
            // }

            const data = {
                title: post.title,
                content: post.content, 
            }

            const response = await axios.put(`/api/posts/${postId}` , data);

            alert("Post updated successfully!");
            router.push('/')

            // Optionally redirect here
        } catch (error: any) {
            setError(error.message || "Error updating post");
        }
    };

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>

            {error && <p className="text-red-500">{error}</p>}

            {post ? (
                <form onSubmit={handleUpdate} className="mt-4">
                    <h3 className="text-lg font-semibold">Editing Post ID: {post.id}</h3>
                    <input
                        type="text"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        className="border rounded-md p-2 w-full mb-2"
                        required
                    />
                    <textarea
                        value={post.content}
                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                        className="border rounded-md p-2 w-full mb-4"
                        rows={4}
                        required
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full">
                        Update Post
                    </button>
                </form>
            ) : (
                <p>No post data available.</p>
            )}
        </div>
    );
}
