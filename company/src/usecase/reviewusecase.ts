import Review from "../domain/review"
import ReviewRepository from "../infrastructure/repository/reviewRepository"
import Publisher from "../infrastructure/repository/publishrepository"

interface ReviewArg{
    _id:string,
    username:string,
    review:string,
    rating:number,
    totalrating:number
}

class Reviewusecase{
    private reviewRepository:ReviewRepository
    private publish:Publisher;
    constructor(reviewRepository:ReviewRepository,publish:Publisher){
        this.reviewRepository = reviewRepository
        this.publish = publish;
    }

    //to create review document if it donot exist if it exist already then it will be updated
    async create(review:ReviewArg){
         try{
            if(review._id){
                const Review=await this.reviewRepository.getReview(review._id);
                if(!Review){
                   const newReview:any=await this.reviewRepository.save({_id:review._id,review:{comment:review.review,rating:review.rating,username:review.username},totalrating:review.rating});
                   this.publish.publish("exchange5","Rating",{id:newReview._id,totalrating:newReview.totalrating})
                   return {
                    status:200,
                    data:newReview
                   }
                }else{
                      const updateReview:any = await this.reviewRepository.update(review._id,review.review,review.rating,review.username);
                      this.publish.publish("exchange5","Rating",{id:updateReview._id,totalrating:updateReview.totalrating})
                      return {
                        status:200,
                        data:updateReview
                      }
                }
            }
            
         }catch(err){
            return { 
                status:400,
                data:err
            }
         }
    }


    // to get all the review of the company
    async getReview(id:string){
        try{
           const review=await this.reviewRepository.getReview(id)
           return {
            status:200,
            data:review
           }
        }catch(err){
            return { 
                status:400,
                data:err
            }
         }
    }


    //to update the comment of the user who already has commented
    async updateComment(id:string,index:number,comment:string,rating:number){
       try{
          const review:any=await this.reviewRepository.updateComment(id,index,comment,rating);
          this.publish.publish("exchange3","Rating",{_id:review._id,totalrating:review.totalrating})
          return { 
           status:200,
           data:review
        }
       }catch(err){
            return { 
                status:400,
                data:err
            }
         }
    }
    async deleteComment(id:string,index:number){
        try{
           const review:any=await this.reviewRepository.deleteComment(id,index);
           this.publish.publish("exchange3","Rating",{_id:review._id,totalrating:review.totalrating})
           return { 
            status:200,
            data:review
         }
        }catch(err){
             return { 
                 status:400,
                 data:err
             }
          }
     }
}

export default Reviewusecase