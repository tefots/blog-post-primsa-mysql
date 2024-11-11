// dynamic route file



export default function PostId({params}: any){

    return (
        <>
        <p>
            Details about post {params.postId}
        </p>
        
        </>
    )


}