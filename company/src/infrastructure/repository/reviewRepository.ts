import Review from "../../domain/review";
import IReviewRepository from "../../usecase/interface/interface/reviewRepository";
import ReviewModel from "../model/reviewModel";

class ReviewRepository implements IReviewRepository{
  constructor(reviewModel: any) {}

  // thwe function is used to create an review
  async save(review: Review):Promise<unknown> {
    try {
      const newReview = await ReviewModel.create(review);
      return newReview;
    } catch (err) {
      throw err;
    }
  }

  //to update the exisiting review
  async update(id: string, review: string, rating: number,username:string):Promise<unknown> {
    try {
      const existingReview = await ReviewModel.findById(id);

      if (!existingReview) {
        throw new Error("Review not found");
      }

      
      const newTotalRating =
        (existingReview.totalrating * existingReview.review.length + rating) /
        (existingReview.review.length + 1);

        const roundedTotalRating = Number(newTotalRating.toFixed(2));

      existingReview.review.push({
        username:username,
        comment: review,
        rating: rating,
      });
      existingReview.totalrating = roundedTotalRating

      const updatedReview = await existingReview.save();

      return updatedReview;
    } catch (err) {
      throw err;
    }
  }

  //
  async getReview(id: string):Promise<unknown> {
    try {
      const review = await ReviewModel.findById(id);
      return review;
    } catch (err) {
      throw err;
    }
  }



async  updateComment(id: string, index: number, comment: string, rating: number):Promise<unknown> {
  try {
    const existingReview = await ReviewModel.findById(id);

    if (!existingReview) {
      throw new Error('Review not found');
    }

    existingReview.review[index].comment = comment;
    existingReview.review[index].rating = rating;

    const newTotalRating =
      existingReview.review.reduce((sum, item) => sum + item.rating, 0) / existingReview.review.length;

    existingReview.totalrating = Number(newTotalRating.toFixed(2));

    const updatedReview = await existingReview.save();

    return updatedReview;
  } catch (err) {
    throw err;
  }
}

async deleteComment(id: string, index: number): Promise<unknown> {
  try {
    const existingReview:any = await ReviewModel.findById(id);

    if (!existingReview) {
      throw new Error('Review not found');
    }

    existingReview.review.splice(index, 1);

    if (existingReview.review.length === 0) {
      existingReview.totalrating = 0; 
    } else {
      const newTotalRating =
        existingReview.review.reduce((sum:any, item:any) => sum + item.rating, 0) / existingReview.review.length;

      existingReview.totalrating = Number(newTotalRating.toFixed(2));
    }

    const updatedReview = await existingReview.save();

    return updatedReview;
  } catch (err) {
    throw err;
  }
}


}

export default ReviewRepository;
