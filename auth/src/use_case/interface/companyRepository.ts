interface ICompanyRepository{
    save(company:any):Promise<unknown>
    findByIdAndUpdate(id:string,update:unknown):Promise<unknown>
    findById(id:string):Promise<unknown>
}

export default ICompanyRepository