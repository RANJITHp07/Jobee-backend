import express from "express"
import Jobcontroller from "../../adapter/jobController";
import Jobusecase from "../../usecase/jobusecase";
import JobRepository from "../repository/jobrepository";
import Listener from "../repository/listenrepository";
import Publisher from "../repository/publishrepository";



const repository=new JobRepository();
const listener=new Listener();
const publish=new Publisher()
const usecase=new Jobusecase(repository,listener,publish);
const  controller=new Jobcontroller(usecase);

const route=express.Router()

route.post("/v6/api/job",(req,res,next)=>controller.save(req,res,next))
route.get("/v6/api/job/:id",(req,res,next)=>controller.findById(req,res,next))
route.post("/v6/api/job/search",(req,res,next)=>controller.search(req,res,next))
route.get("/v6/api/job/search/filter",(req,res,next)=>controller.filter(req,res,next))
route.get("/v6/api/job/location/parts",(req,res,next)=>controller.locations(req,res,next))
route.get("/v6/api/job/roles/parts",(req,res,next)=>controller.getRoles(req,res,next))
route.post("/v6/api/job/findsimilar",(req,res,next)=>controller.findSimilarJobs(req,res,next))
route.get("/v6/api/job/jobs",(req,res,next)=>controller.job(req,res,next))
route.get("/v6/api/job/jobs/company/:id",(req,res,next)=>controller.companyJob(req,res,next))
route.delete("/v6/api/job/:id",(req,res,next)=>controller.deleteJob(req,res,next))
route.get("/v6/api/job/role/search",(req,res,next)=>controller.findSearch(req,res,next))
route.put("/v6/api/job",(req,res,next)=>controller.updateJob(req,res,next))
route.put("/v6/api/job",(req,res,next)=>controller.updateJob(req,res,next))
route.post("/v6/api/job/mutual/skills",(req,res,next)=>controller.mutualSkills(req,res,next))



export default route