import Job from "../../domain/job";
import Query from "./query";

interface IJobRepsitory{
    save(job:Job):Promise<unknown>
    findById(id:string):Promise<unknown>
    filter(query:Query):Promise<unknown>
    findByIdAndUpdate(id:string,update:object):Promise<unknown>
    findByIdAndDelete(id:string):Promise<unknown>
    search(search:string):Promise<unknown>
    findJobs(arg:string):Promise<unknown>
}

export default IJobRepsitory