"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: {
        username: string;
    };
}

export default function EditPost({ params }: { params: { id: number } }) {
    const router = useRouter();
    const postId = params.id; 
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    const response = await fetch(`/api/posts/${postId}`);
                    const data = await response.json();
                    console.log('Fetched post:', data); // Check structure here

                    if (response.ok) {
                        setPost(data.post || data); // Adjust based on actual data structure
                    } else {
                        setError(data.message || 'Error fetching post');
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                    setError('Error fetching post');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post),
                });

                if (response.ok) {
                    router.push('/'); 
                } else {
                    const data = await response.json();
                    setError(data.message || 'Error updating post');
                }
            } catch (error) {
                setError('Error updating post');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            {post && (
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={post.title || ''} 
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block mb-2">Content</label>
                        <textarea
                            id="content"
                            value={post.content || ''} 
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Post</button>
                </form>
            )}
        </div>
    );
}
