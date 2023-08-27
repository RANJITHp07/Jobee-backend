import Userusecase from "../usecase/userusecase";

class UserController{
    private userusecase:Userusecase

    constructor(userusecase:Userusecase) {
        this.userusecase = userusecase;
    }

    async save(){
        try{
            const user=await this.userusecase.save();
            console.log(user)
        }catch(err){
            throw err
        }
    }

    async update(){
        try{
            const user=await this.userusecase.update()
            return user
        }catch(err){
            throw err
        }
    }

    
}

export default UserController