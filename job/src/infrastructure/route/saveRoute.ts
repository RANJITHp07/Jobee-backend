import SaveController from "../../adapter/saveController";
import SaveUsecase from "../../usecase/saveusecase";
import SaveModel from "../model/saveModel";
import SaveRepository from "../repository/saveRepository";
import express,{NextFunction, Router} from "express";


const model=new SaveModel();
const repository = new SaveRepository(model);
const usecase=new SaveUsecase(repository);
const controlller=new SaveController(usecase);

const route=express.Router()

route.post("/v6/api/job/save",(req, res,next) =>controlller.save(req,res,next))
route.get("/v6/api/job/save/:id",(req, res,next) =>controlller.findsaved(req,res,next))

export default route