import Company from "../../domain/company" 

interface ICompanyRepository{
    save(comapny:Company):Promise<unknown>
    findById(id:string):Promise<unknown>
    findByIdAndUpdate(id:string,update:unknown):Promise<unknown>
}

export default ICompanyRepository