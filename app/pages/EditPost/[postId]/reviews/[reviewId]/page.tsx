export default function ProductDetails({params} : { 
    params : { 
        productId: string;
        reviewId: string;
    
     }

}){
    return (
        <>
        <h1>Reviews of the product</h1>

        <p>Review {params.reviewId} for  product {params.productId}</p>
              
        </>
    );
}