import Job from "../../domain/job";

interface IJobRepository  {
    save(job: Job): Promise<unknown>
    update(id: string, userid: string): Promise<unknown>
    getUsers(id: string): Promise<unknown>
    updatestatus(id:string,userId:string,status:string):Promise<unknown>
    shorlist(id:string,userId:string[]):Promise<unknown>
    findshortlisted(id:string):Promise<unknown>
    filter(id:string,status:string[]):Promise<unknown>
    findUser(id:string):Promise<unknown>
}

export default IJobRepository