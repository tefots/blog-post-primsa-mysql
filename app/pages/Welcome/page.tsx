import Link from "next/link";
import Image from "next/image";
import AllPosts from "../AllPosts/page";
import NavBar from "@/app/components/NavBar";
export default function Welcome(){

    return (
        <>
        <NavBar />
        <div className="md:h-screen h-[400px] flex flex-col sapce-y-7 ">
            <div className="relative w-full h-screen">
                <Image 
                src={'/pictures/post.jpeg'}
                layout= {'fill'}
                alt="Background"
                className="opacity-85"
                />                    
            </div>

            <div className="absolute inset-0 items-center justify-center  flex flex-col space-y-10  text-white">
                <h1 className="text-3xl border-purple-400 text-white font-light">Most intresting blogs your can never regret reading</h1>

                <div className="mt-4">
                    <Link className="text-xl font-semibold bg-purple-500 rounded-2xl p-5 " href={'/pages/Dashboard'}>
                        Get Started
                    </Link>
                </div>
            </div>
        </div>  

              {/* Posts */}
              <AllPosts />
        </>
    );
}