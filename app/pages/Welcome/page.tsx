import Link from "next/link";

export default function Welcome(){

    return (
        <>
        <div className="flex flex-col sapce-y-7 ">
            <div className="items-center justify-center bg-slate-400">
                <h1>Most intresting blogs your can never regret reading</h1>

                <div className="flex flex-col ">
                    <Link className="text-lg p-5 " href={'/pages/Dashboard'}>
                        Get Started
                    </Link>
                </div>
            </div>
        </div>        
        </>
    );
}