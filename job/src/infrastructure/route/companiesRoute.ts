import express from 'express';
import { CompanyModel } from '../model/companyModel';
import companyRepository from '../repository/companyRepository';
import Companycontroller from '../../adapter/companyController';
import Listener from '../repository/listenrepository';
import Companyusecase from '../../usecase/companyusecase';


const model=new CompanyModel()
const repository=new companyRepository(model);
const listen=new Listener()
const usecase=new Companyusecase(repository)
const controller=new Companycontroller(usecase,listen);


const router= express.Router();

router.get("/v6/api/job/companies/filter",(req,res,next)=>controller.filter(req,res,next));
router.get("/v6/api/job/get/companies",(req,res,next)=>controller.find(req,res,next));

export default router