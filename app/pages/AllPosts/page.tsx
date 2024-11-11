"use client";
import { useRouter } from 'next/navigation';
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

    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

            // Define handleDelete outside useEffect
            const handleDelete = async (id: number) => {
                try {
                    const res = await fetch(`/api/posts/${id}`, { // Note the change here
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
            
                    if (!res.ok) {
                        const data = await res.json();
                        console.error("Error deleting post:", data.message);
                    } else {
                        console.log("Post deleted successfully");

                        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        
                        //router.refresh(); // Refresh the page after successful deletion
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            };
            
    // function to update the post
    const handleUpdate = async (id: number, title: string, content: string) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
    
            if (!res.ok) {
                console.error("Error updating post");
            } else {
                const data = await res.json();
                console.log("Post updated successfully:", data.post);
                // Optionally, refresh your posts or update local state here
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

// getting all posts
    useEffect(() => {
                  // function to retrive all posts
        async function fetchPosts() {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();
                
                // Check if the request was successful
                if (data.status === 201) {
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
        <div id="posts" className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul className=" space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="border p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                                <div className="flex justify-end gap-3 mt-4 text-sm">
                                    <button className="font-semibold" onClick={() => router.push(`/pages/EditPost/${post.id}`)}>Update</button>
                                    <button className="font-semibold" onClick={() => handleDelete(post.id)}>Delete</button>
                                </div>

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
