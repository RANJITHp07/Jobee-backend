import Stripe from "stripe"

class StripeRepository{
      private stripe=new Stripe(process.env.PUBLISHABLE_KEY as string,{
        apiVersion:"2022-11-15"
      });


      async getPlan(){
        try{
            const price=await this.stripe.prices.list({
                apiKey:process.env.SECRET_KEY,
              
             })
             return price
        }catch(err){
            throw err
        }
      }

      async createSession(email:string){
        try{
            const customer = await this.stripe.customers.create(
                {
                  email,
                },
                {
                  apiKey: process.env.SECRET_KEY,
                }
              );
              
              return customer
        }catch(err){
            throw err
        }
      }

      async createPlan(priceId:string,stripeCustomerId:string){
        try{
            const session = await this.stripe.checkout.sessions.create(
                {
                  mode: "subscription",
                  payment_method_types: ["card"],
                  line_items: [
                    {
                      price:priceId,
                      quantity: 1,
                    },
                  ],
                  success_url: "https://jobee-omega.vercel.app/job/form",
                  cancel_url: "https://jobee-omega.vercel.app/company",
                  customer: stripeCustomerId,
                },
                {
                  apiKey: process.env.SECRET_KEY,
                }
            )
            return session
        }catch(err){
            throw err
        }
      }


    async subscription(stripeCustomerId:string){
      try{
          
  const subscriptions = await this.stripe.subscriptions.list(
    {
      customer: stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.SECRET_KEY,
    }
  );
  const hasActiveSubscription = subscriptions.data.some((sub) => {
    return sub.status === "active" && sub.current_period_end > Math.floor(Date.now() / 1000);
  });
    return hasActiveSubscription
      }catch(err){
            throw err
        }
    }
   
    async getActiveSubscriptions() {
      try {
        const subscriptions = await this.stripe.subscriptions.list({
          status: "active",
          expand: ["data.customer", "data.plan"],
          limit: 100,
        });
  
        return subscriptions.data;
      } catch (err) {
        throw err;
      }
    }

}

export default StripeRepository