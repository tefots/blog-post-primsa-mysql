// app/EditPost/[id]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPost({ params }: { params: { id: string } }) {
    const router = useRouter();
    const postId = params.id; // Accessing post ID from params
    const [post, setPost] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    const response = await fetch(`/api/posts/${postId}`);
                    const data = await response.json();

                    if (response.ok) {
                        setPost(data.post); // Assume your API returns { post: { title, content } }
                    } else {
                        setError(data.message || 'Error fetching post');
                    }
                } catch (error) {
                    setError('Error fetching post');
                } finally {
                    setLoading(false);
                }
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
                    // Post updated successfully
                    router.push('/'); // Redirect back to the posts page after updating
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
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={post?.title || ''}
                        onChange={(e) => setPost((prevPost) => ({ ...prevPost!, title: e.target.value }))} // Use non-null assertion to avoid null error
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-2">Content</label>
                    <textarea
                        id="content"
                        value={post?.content || ''}
                        onChange={(e) => setPost((prevPost) => ({ ...prevPost!, content: e.target.value }))} // Use non-null assertion to avoid null error
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Post</button>
            </form>
        </div>
    );
}
