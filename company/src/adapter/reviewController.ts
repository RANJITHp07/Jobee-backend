import Reviewusecase from "../usecase/reviewusecase"
import { Response,Request,NextFunction } from "express";

class ReviewController{
    private reviewusecase:Reviewusecase;

    constructor(reviewusecase:Reviewusecase){
       this.reviewusecase = reviewusecase;
    }

    //to create the first review and to update it if it exist
    async create(req:Request,res:Response,next:NextFunction){
      try{
        const review=await this.reviewusecase.create(req.body);
        if(review)
        res.status(review?.status).json(review?.data);
      }catch(err){
        next(err);
      }
    }

    //to get all the reviews of a  company
    async getReview(req:Request,res:Response,next:NextFunction){
        try{
             const getReview = await this.reviewusecase.getReview(req.params.id)
             res.status(getReview?.status).json(getReview?.data);
          }catch(err){
            next(err);
          }
    }


    // to update the comment of an company
    async updateComment(req:Request,res:Response,next:NextFunction){
      try{
          const updateComment = await this.reviewusecase.updateComment(req.body.id,req.body.index,req.body.comment,req.body.rating);
          res.status(updateComment.status).json(updateComment.data);
      }catch(err){
            next(err);
          }
    }

    async delteComment(req:Request,res:Response,next:NextFunction){
      try{
          const updateComment = await this.reviewusecase.deleteComment(req.body.id,req.body.index);
          res.status(updateComment.status).json(updateComment.data);
      }catch(err){
            next(err);
          }
    }
}

export default  ReviewController