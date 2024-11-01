import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: {
    username: string;
    };
}

export default function AllPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                
                // Check if the request was successful
                if (data.status === 200) {
                    setPosts(data.posts); // Set posts data from API response

                } else {
                    console.error('Error fetching posts:', data.message);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="border p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="mt-2">{post.content}</p>
                            <p className="text-gray-600 text-sm">
                                By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
