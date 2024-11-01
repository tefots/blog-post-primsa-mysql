// app/EditPost/[postId]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface UpdatePostProps {
    onUpdate: (id: number, title: string, content: string) => void;
    onCancel: () => void;
}

// Component function for the edit page
export default function EditPost({ onUpdate, onCancel }: UpdatePostProps) {
    const { postId } = useParams(); // Get the postId from the dynamic route
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Fetch or set the post based on postId
    useEffect(() => {
        // Assuming a fetchPost function retrieves post data by postId
        async function fetchPost() {
            const response = await fetch(`/api/posts/${postId}`);
            const postData = await response.json();
            setPost(postData);
            setTitle(postData.title);
            setContent(postData.content);
        }
        if (postId) fetchPost();
    }, [postId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            onUpdate(post.id, title, content);
        }
    };

    if (!post) return <p>Loading post...</p>; // Show loading if post is not yet loaded

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-semibold">Editing Post</h2>
            <div>
                <label className="block">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="border p-2 rounded w-full"
                ></textarea>
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
                Update Post
            </button>
            <button
                type="button"
                onClick={onCancel}
                className="mt-4 ml-2 bg-gray-500 text-white p-2 rounded"
            >
                Cancel
            </button>
        </form>
    );
}
