"use client";


import Authentication from "@/app/components/Authentication";

export default function Auth()
{
   return (
       <div className="bg-slate-800 h-screen w-full">
           {/* calling the authentication component */}
          
           <Authentication />
           
       </div>
   )
}
