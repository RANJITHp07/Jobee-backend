import Auth from "../domain/auth";
import AuthRepository from "../infrastructure/repository/authRepository";
import Encrypt from "../infrastructure/repository/bcryptRepository";
import jwtPassword from "../infrastructure/repository/jwtRepository";
import Publisher from "../infrastructure/repository/publishrepository";
import Nodemailer from "../infrastructure/repository/nodemailer";


class Authusecase{

    private authRepository:AuthRepository
    private encrypt:Encrypt
    private jwt:jwtPassword;
    private publish:Publisher
    private nodemailer:Nodemailer


    constructor(authRepository:AuthRepository,encrypt:Encrypt,jwt:jwtPassword,publish:Publisher,nodemailer:Nodemailer){
        this.authRepository=authRepository
        this.encrypt=encrypt
        this.jwt=jwt
        this.publish=publish
        this.nodemailer=nodemailer
    }
    
    
    async save(user:Auth){
         try{
            const User=await this.authRepository.findByEmail(user.email)
            if(User){
                return {
                    status:200,
                    data:"Already Exist"
                }
            }else{
                if(user.password){
                    const newPassword=await this.encrypt.createHash(user.password)
                    const newUser={...user,password:newPassword}
                    const User:any=await this.authRepository.save(newUser)

                    await this.publish.publish("exchange1","User",{_id:User._id,username:User.username,email:User.email,role:User.role})
                }
              
                return {
                    status:200,
                    data: "Saved sucessfully"
                }
            }
         }catch(err){
            return {
                status:400,
                data:err
            }
         }
    }

    async login(user:{email:string,password:string}){
        try{
             
             const Userlogin:any=await this.authRepository.findByEmail(user.email);
             if(Userlogin){
                if(await this.encrypt.compare(user.password,Userlogin.password)){
        
                    const token=this.jwt.createJWT(Userlogin._id,Userlogin.admin)
                    
                    return {
                        status:200,
                        data:{
                           message: "Logged In succesfully",
                           userId:Userlogin._id,
                           token,
                           role:Userlogin.role
                        }
                    }
                }else{
                    return {
                        status:200,
                        data:"Wrong Password"
                    } 
                }
             }else{
                return {
                    status:200,
                    data:"Wrong Email"
                }
             }
        }catch(err){
            return {
                status:400,
                data:err
            }
    }
}
   

async findByIdAndUpdate(email:string,update:{email?:string,username?:string,password?:any}){
    try{
        let updates
        if( update.password){
            console.log('update'+update)
            const haspassword=await this.encrypt.createHash(update.password)
            updates=await this.authRepository.findByIdAndUpdate(email,{password:haspassword})
        }else{

           updates=await this.authRepository.findByIdAndUpdate(email,update)
            await this.publish.publish("exchange2","UpdateAuth",{email,update})
        }
        return {
            status:200,
            data:updates
        }
    }catch(err){
        console.log(err)
        return {
            status:400,
            data:err
        }
}
}



async find(query:{email?:string,role?:string,id?:string}){
  try{
    let user;
    if(query.email){
      user=await this.authRepository.findByEmail(query.email)
    }else if(query.role){
        user=await this.authRepository.find(query.role)
    }else if(query.id){
        user=await this.authRepository.findById(query.id)
    }
    return{
        status:200,
        data:user
      }
  }catch(err){
    throw err
  }
}


async verifyEmail(email:string,username:string){
    try{
        const verify=await this.nodemailer.sendEmailVerification(email,username)
       
        return {
            status:200,
            data:verify
        }
    }catch(err){
        return {
            status:400,
            data:err
        } 
    }
}

async emailVeification(otp:string,email:string){
    try{
        const verify=await this.nodemailer.verifyEmail(otp,email)
        return {
            status:200,
            data:verify
        }
    }catch(err){
        return {
            status:400,
            data:err
        } 
    }
}

}

export default Authusecase