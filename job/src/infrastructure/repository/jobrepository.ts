import Job from "../../domain/job";
import IJobRepsitory from "../../usecase/interface/jobRepository";
import JobModel from "../model/jobModel";
import { CompanyModel } from "../model/companyModel";

 class JobRepository implements IJobRepsitory{

  // it is to save an job applicants
      async save(job: Job): Promise<unknown> {
          try{
             await JobModel.create(job)
             return "saved successfully"
          }catch(err){
            console.log(err)
            return err
          }
      } 

      //it is used to filter out the job based on the users prefernce
      
      async filter(query:any): Promise<unknown> {
        try {
          let {
            workmode,
            salary,
            experience,
            location,
            companyType,
            rating
          } = query;
      
      


  const filters: any[] = [];

  if (workmode && workmode.length > 0) {
    filters.push({ workmode: { $in: workmode} });
  }

  if (salary && salary.length > 0) {

    const salaryFilters =salary.map((range:string[]) => ({
      salary:  {
        $gte: parseInt(range[0]),
        $lte: parseInt(range[1])
      }
    }));
    
    filters.push({ $or: salaryFilters });
  }

  if (experience && experience.length > 0) {
    experience=[parseInt(experience[0]),parseInt(experience[1])]
    filters.push({ experience: {$gte:experience[0], $lte:experience[1] } }); 
  }

  if (location &&location.length > 0) {
    const locationFilter = location.map((l: any) => ({
      location: {
        $regex: new RegExp(l, 'i')
      }
    }));
    filters.push({ $or: locationFilter });
  }

  if (companyType &&companyType.length > 0) {
    let company=await CompanyModel.find({companyType:{$in:companyType}})
    let companies=company.map((p)=>p._id)
    filters.push({ company: { $in:companies} });
  }



  if (rating && rating.length > 0) {
    const ratingFilters =rating.map((range:string) => ({
      rating:  {
        $gte: parseInt(range)-1,
        $lte: parseInt(range)
      }
    }));
    
    let company=await CompanyModel.find({$or:ratingFilters})
   
    let companies=company.map((p)=>p._id)
    
    filters.push({ company: { $in:companies} });
  }

  const queryResult = await JobModel.find({
    $and: filters.length > 0 ? filters : [{}]
  }).populate('company').sort({createdAt:-1});

 return queryResult
        } catch (err) {
          console.log(err)
          return err
        }
}
      

     // to find the job using the _id and populate the company field 
     //and the company field consist of the details of the company
      async findById(id: string): Promise<unknown> {
          try{
             const job=await JobModel.findById(id).populate("company")
            return job
          
          }
          catch(err){
            console.log(err)
              return err
          }
      }

      //find the job and delete it as per the users request
      async findByIdAndDelete(id: string): Promise<unknown> {
        try{
            await JobModel.findByIdAndDelete(id)
           return "Sucessfully Deleted"
         
         }
         catch(err){
             return err
         }
      }


      // to update the job application
      async findByIdAndUpdate(id: string, update: object): Promise<unknown> {
        try{
            await JobModel.findByIdAndUpdate(id,{$set:update})
           return "Sucessfully Updated"
         
         }
         catch(err){
             return err
         }
      }
  
      getUniqueLocations = async () => {
        try {
        
          const uniqueLocations = await JobModel.distinct('location');
          
          const locations=uniqueLocations.map((p)=>{
              const c:any= p.split(',')
              return c[0]
          })
          
          return locations;
        } catch (error) {
          console.log(error)
          throw error;
        }
      }

      async getJobroles(){
         try{
          const uniquerole = await JobModel.distinct('role');
          return uniquerole
         }catch(err){
          throw err
         }
      }

      // to find the jobs of an company using the company id
      async companyJobs(id:string){
        try{
          const job=await JobModel.find({company:id}).populate("company")
         return job
       
       }
       catch(err){
           return err
       }
      }

      // this is used to search the job based on the job role and the location
      async search(search: string): Promise<unknown> {
          try{
            const searchResult = await JobModel.find({ $text: { $search: search } }, { score: { $meta: 'textScore' } }).populate('company')
  .sort({ score: { $meta: 'textScore' } })
  .exec();
    return searchResult
          }catch(err){
            return err
        }
      }

      // find the jobs based on the companyType and the workmode
      async findJobs(arg: string): Promise<unknown> {
        try {
          
          if(arg){
            const jobs = await JobModel.find({
              $or: [{ companyType: arg }, { workmode: arg }]
            });
            return jobs;
          }
        } catch (error) {
          console.log(error)
          throw error;
        }
      }


      // to find all the saved jobs of an user
      async findsavedJobs(id:string[]):Promise<unknown> {
          try{
               const savedJobs=await JobModel.find({_id:{$in:id}}).populate("company")
               return savedJobs
          } catch (error) {
          console.log(error)
          throw error;
        }
      }

      async findSimilar(role: string, location: string,skills:string[]) {
        try {
          const similarJobs = await JobModel.find({
            $or: [
              { role: { $regex: new RegExp(role, 'i') } },
              {skills:{$in:skills}},
              { location: location }
            ]
          }).populate('company');
          return similarJobs;
        } catch (err) {
          throw err;
        }
      }
      
      // to populate all the jobs of an company
      async find(id:string[]){
        try{
          const job=await JobModel.find({_id:{$in:id}}).populate("company")
          return job
        }catch (error) {
          console.log(error)
          throw error;
        }
      }

      async findSearch(role:string,location:string){ 
        try{
           const search=await JobModel.find({role:role,location: {
            $regex: new RegExp(location, 'i')
          }});
           return search
        }catch(err){
            throw err
        }
      }
    
 } 

export default JobRepository