import Auth from "../../domain/auth";

interface IAuthRepository{
    save(auth:Auth):Promise<unknown>
    update(email: string, update: any): Promise<unknown>

}

export default IAuthRepository