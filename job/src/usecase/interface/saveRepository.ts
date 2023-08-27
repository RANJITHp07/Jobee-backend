import Save from "../../domain/save"

interface ISaveRepository{
    save(save:Save):Promise<unknown>
    update(id:string,jobId:string):Promise<unknown>
    findsaved(id:string):Promise<unknown>
}

export default ISaveRepository