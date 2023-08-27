import Auth from "../../domain/auth"

interface IAuthRepository{
   save(auth:Auth):Promise<unknown>
   findById(id:string):Promise<unknown>
   findByEmail(email:string):Promise<unknown>
   findByIdAndUpdate(email:string,update:{email?:string,username?:string,password?:string}): Promise<unknown>
   find(role:string):Promise<unknown>
}

export default IAuthRepository