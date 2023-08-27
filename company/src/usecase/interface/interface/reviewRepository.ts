import Review from "../../../domain/review";

interface IReviewRepository{
     save(review: Review):Promise<unknown> 
     update(id: string, review: string, rating: number,username:string):Promise<unknown>
     getReview(id: string):Promise<unknown>
     updateComment(id: string, index: number, comment: string, rating: number):Promise<unknown>
}

export default IReviewRepository