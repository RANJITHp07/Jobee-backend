import Auth from "../domain/auth";
import AuthRepository from "../infrastructure/repository/authRepository";


class Authusecase{
    private authrepository:AuthRepository;

    constructor(authrepository:AuthRepository){
       this.authrepository = authrepository;
    }

    //to save user from auth service
    async save(auth:Auth){
        try{
           const user=await this.authrepository.save(auth)
           console.log("changes")
           return user
        }catch(err){
            throw err
        }
    }

    //to update the user details coming from auth service
    async update(email:string,update:any){
        try{

            const userUpdate=await this.authrepository.update(email,update)
            return userUpdate
        }catch(err){
            throw err
        }
    }
}



export default Authusecase