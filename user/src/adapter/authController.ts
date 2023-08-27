import Auth from "../domain/auth"
import Authusecase from "../usecase/authusecase"

class AuthController{
    private authusecase:Authusecase
    constructor(authusecase:Authusecase){
        this.authusecase = authusecase
    }

    // to create an auth
    async create(auth:Auth){
         try{
            const user=await this.authusecase.save(auth)
         }catch(err){
            throw err 
         }
    }


   //to update the details of the auth
    async update(email:string,update:any){
        try{
            const user=await this.authusecase.update(email,update)
                 }catch(err){
            throw err 
         }
    }

}


export default AuthController