import User from "../../domain/user";

interface IUserRepository{
    create(user:User):Promise<unknown>
    update(email:string,update:any):Promise<unknown>

}

export default IUserRepository