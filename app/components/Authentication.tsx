import { useRouter } from "next/navigation";
import { GithubSignInButton, GoogleSignInButton } from "./authButtons";
import { PiLockKeyBold } from "react-icons/pi";

export default function Authentication() {
   const router = useRouter();  // Get router instance from Next.js

   const handleCancel = () => {
       router.push('/');  // Go back to the previous page
   };

   return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 px-4 sm:px-0">
           <div className="flex flex-col sm:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
               {/* Form Section */}
               <div className="w-full sm:w-2/3 px-6 sm:px-8 py-8 sm:py-10">
                   <h1 className="text-3xl sm:text-4xl font-semibold text-purple-800 mb-4 sm:mb-6 text-center sm:text-left">
                       Continue with
                   </h1>
                   <p className="text-base sm:text-lg text-purple-600 mb-4 sm:mb-6 text-center sm:text-left">
                       Choose account to continue with
                   </p>

                   {/* Social Sign-In Buttons */}
                   <div className="space-y-4 sm:space-y-6">
                       <GoogleSignInButton />
                       <GithubSignInButton />
                   </div>

                   <div className="mt-6 sm:mt-8 flex justify-center">
                       <button
                           onClick={handleCancel}
                           className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-10 sm:px-20 rounded-full transition-colors"
                       >
                           Cancel
                       </button>
                   </div>
               </div>

               {/* Icon Section */}
               <div className="hidden sm:flex sm:w-1/3 items-center justify-center bg-purple-500 p-8">
                   <PiLockKeyBold size={140} className="text-white" />
               </div>
           </div>
       </div>
   );
}
