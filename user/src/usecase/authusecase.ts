import Auth from "../domain/auth";
import AuthRepository from "../infrastructure/repository/authRepository";


class Authusecase{
    private authrepository:AuthRepository;

    constructor(authrepository:AuthRepository){
       this.authrepository = authrepository;
    }

    async save(auth:Auth){
        try{
           const user=await this.authrepository.save(auth)
           return user
        }catch(err){
            throw err
        }
    }

    async update(email:string,update:any){
        try{

            const userUpdate=await this.authrepository.update(email,update)
        }catch(err){
            throw err
        }
    }
}



export default Authusecase