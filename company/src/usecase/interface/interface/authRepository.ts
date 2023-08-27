import Auth from "../../../domain/auth";

interface IAuthRepository{
    save(auth:Auth):Promise<unknown>
    update(id:string,update:any):Promise<unknown>
}

export default IAuthRepository