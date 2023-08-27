import StripeRepository from "../infrastructure/repository/stripeRepository";

class Stripeusecase{
    private stripe:StripeRepository

    constructor(stripe:StripeRepository){
        this.stripe=stripe;
    }

    async getPlans(){
        try{
           const plans=await this.stripe.getPlan()
           return {
            status:200,
            data:plans
           }
        }catch(err){
            console.log(err)
            return{
               status:404,
               data:err
            }
            
        }
    }
    

    async createPlans(priceId:string,stripeId:string){
        try{
           const plans=await this.stripe.createPlan(priceId,stripeId)
           return {
            status:200,
            data:plans
           }
        }catch(err){
            console.log(err)
            return{
               status:404,
               data:err
            }
            
        }
    }

    async subscriptions(stripeId:string){
        try{
            const subscriptions=await this.stripe.subscription(stripeId)
            return {
                status:200,
            data:subscriptions
            }
        }catch(err){
            return{
               status:404,
               data:err
            }
            
        }
    }

    async getAllplans(){
        try{
            const subscriptions=await this.stripe.getPlan()
            return {
                status:200,
            data:subscriptions
            }
        }catch(err){
            return{
               status:404,
               data:err
            }
            
        }
    }

}

export default Stripeusecase