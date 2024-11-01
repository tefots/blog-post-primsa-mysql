"use client";
// UpdatePost.tsx
import { useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface UpdatePostProps {
    post: Post | null;
    onUpdate: (id: number, title: string, content: string) => void;
    onCancel: () => void;
}

const EditPost: React.FC<UpdatePostProps> = ({ post, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            onUpdate(post.id, title, content);
        }
    };

    if (!post) return null; // Return null if there's no post to update

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
};

export default EditPost;
