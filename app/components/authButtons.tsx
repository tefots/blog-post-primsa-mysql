import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg transform transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {/* Google Sign In Button */}
        <GoogleSignInButton  />
        {/* isSignup={false} */}

        {/* GitHub Sign In Button */}
        <GithubSignInButton />
      </div>
    </div>
  );
}
// Inside your authButtons.tsx file or where you define the GoogleSignInButton component
export function GoogleSignInButton() {
  // { isSignup }: { isSignup: boolean }
  return (
      <button
      onClick={() => signIn('google' , {callbackUrl: '/pages/Dashboard' })} 
        className="w-full flex items-center justify-center font-semibold h-11 px-4 md:px-6 lg:px-8 mt-2 md:mt-4
      text-base md:text-lg lg:text-xl transition-all duration-300 ease-in-out bg-white border border-slate-600 text-black
      rounded-full focus:outline-none hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
          >
         <Image src="/pictures/google_logo.png" alt="Github Logo" width={30} height={30} />
         <span className="ml-4">Google</span>
      </button>
  );
}


export function GithubSignInButton() {

  return (
    <button
      onClick={() => signIn("github" , {callbackUrl: '/pages/Dashboard' })}
      className="w-full flex items-center justify-center font-semibold h-11  px-4 md:px-6 lg:px-8 mt-2 md:mt-4
      text-base md:text-lg lg:text-xl transition-all duration-300 ease-in-out bg-white border border-slate-600 text-black
      rounded-full focus:outline-none hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
    >
      <Image src="/pictures/github.png" alt="Github Logo" width={30} height={30} />
      <span className="ml-4">GitHub</span>
    </button>
  );
}
