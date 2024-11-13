"use client";
import Navbar from "@/app/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CldImage, CldUploadWidget } from 'next-cloudinary';


interface CreatePostProps {
    isCreatePostClicked: boolean;
    togglePostsCreation: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ isCreatePostClicked, togglePostsCreation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null); // Image state to store the selected file
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Use FormData to handle file upload
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("authorId", "3");
        if (image) {
            formData.append("image", image); // Add the image file to the form data
        }

        const res = await fetch('/api/posts', {
            method: 'POST',
            body: formData, // Send FormData instead of JSON
        });

        const data = await res.json();
        console.log(data.message);

        if (!res.ok) {
            console.log("Error creating post:", data); // Log the error if the response is not OK
        } else {
            router.push('/'); // Redirect only if the response is OK
        }
    };

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <div className="relative h-screen w-full">
                <Image
                    src={'/pictures/new-blog-post.jpg'}
                    alt="background-picture"
                    quality={100}
                    layout="fill"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-70"></div> {/* Adjust opacity here */}
            </div>
            <div className="absolute bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Create New Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 "
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea 
                            name="content" 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required 
                            rows={10}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-2 "
                        />
                    </div>
                    <div>
                        {/* the use of cloudinary to uplaod image */}
                                                
                        <CldUploadWidget uploadPreset="tsiu_blog_preset">
                        {({ open }) => {
                            return (
                            <button onClick={() => open()}>
                                <span className="text-blue-400">Upload an Image</span>
                            </button>
                            );
                        }}
                        </CldUploadWidget>
                        
                    </div>
                    <div className="flex justify-between">
                        <Link href="/" className="text-blue-600 hover:underline">
                            Back to Home
                        </Link>
                        <button 
                            type="submit" 
                            className="bg-green-800 text-white font-semibold rounded-xl px-4 py-2 hover:bg-blue-700 transition duration-200"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default CreatePost;
