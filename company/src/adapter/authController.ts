import Auth from "../domain/auth"
import Authusecase from "../usecase/authusecase"

class AuthController{
    private authusecase:Authusecase
    constructor(authusecase:Authusecase){
        this.authusecase = authusecase
    }

    //to create user 
    async create(auth:Auth){
         try{
              await this.authusecase.save(auth);
         }catch(err){
            throw err 
         }
    }

    //to update the user details using email
    async update(email:string,update:any){
        try{
            await this.authusecase.update(email,update)
                 }catch(err){
            throw err 
         }
    }

}


export default AuthController