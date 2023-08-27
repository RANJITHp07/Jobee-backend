import Auth from "../../domain/auth"


interface IAdminRepository{
    signin(admin:Auth):Promise<unknown>
    findByemail(email:string):Promise<unknown>
    findById(id:string):Promise<unknown>
}

export default IAdminRepository