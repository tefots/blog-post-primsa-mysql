import Link from "next/link";
import Image from "next/image";
import AllPosts from "../AllPosts/page";
import NavBar from "@/app/components/NavBar";
export default function Welcome(){

    return (
        <>
        <NavBar />
        <div className="relative md:h-[80vh] h-[250px] flex flex-col sapce-y-7 ">
            <div className="relative bg-black w-full h-screen">
                <Image 
                src={'/pictures/post.jpeg'}
                layout= {'fill'}
                alt="Background"
                className="opacity-100 object-fit"
                />                    
            </div>

            <div className="absolute bg-black md:bg-transparent inset-0 items-center justify-center  flex flex-col space-y-10  text-white p-5">
                <h1 className="text-3xl border-purple-400  text-white font-semibold">Intresting blogs you can never regret reading</h1>

                <div className="mt-4">
                    <Link className="text-xl font-semibold bg-purple-500 rounded-2xl p-5 animate-bounce transition-3000 ease-in-out" href={'/pages/Auth'}>
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