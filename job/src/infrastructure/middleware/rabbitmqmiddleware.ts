import Companycontroller from "../../adapter/companyController";
import Companyusecase from "../../usecase/companyusecase";
import { CompanyModel } from "../model/companyModel";
import companyRepository from "../repository/companyRepository";
import JobRepository from "../repository/jobrepository";
import Listener from "../repository/listenrepository";
import Publisher from "../repository/publishrepository";
import Jobusecase from "../../usecase/jobusecase";
import Jobcontroller from "../../adapter/jobController";


const repository=new companyRepository(CompanyModel);
const usecase=new Companyusecase(repository)
const listener=new Listener()
const publish=new Publisher()
const controller=new Companycontroller(usecase,listener)
const jobRepository=new JobRepository()
const jobusecase=new Jobusecase(jobRepository,listener,publish)
const jobController=new Jobcontroller(jobusecase)

async function RabbitmqSave(){
      await controller.save()
}


async function RabbitmqUpdate(){
      await controller.update()
}

async function RabbitmqUpdateComment(){
      await controller.updateRating()
}

export {RabbitmqSave,RabbitmqUpdate,RabbitmqUpdateComment}