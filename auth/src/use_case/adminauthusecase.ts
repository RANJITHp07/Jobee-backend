import AdminRepository from "../infrastructure/repository/adminauthRepository"
import Encrypt from "../infrastructure/repository/bcryptRepository";
import jwtPassword from "../infrastructure/repository/jwtRepository";
import Publisher from "../infrastructure/repository/publishrepository";
import Nodemailer from "../infrastructure/repository/nodemailer";
import Auth from "../domain/auth";

class Adminauthusecase{
    private authRepository:AdminRepository
    private encrypt:Encrypt
    private jwt:jwtPassword;
    private publish:Publisher
    private nodemailer:Nodemailer

    constructor(authRepository:AdminRepository, encrypt:Encrypt,jwt:jwtPassword,publish:Publisher,nodemailer:Nodemailer){
        this.authRepository=authRepository;
        this.encrypt=encrypt
        this.jwt=jwt
        this.publish=publish
        this.nodemailer=nodemailer
    }


    //to sigin as an admin
    async signin(admin:Auth){
        try{
            const Admin=await this.authRepository.findByemail(admin.email)
            if(Admin){
                return {
                    status:200,
                    data:"The user already exist"
                }
            }else{
                if(admin.password){
                    const newPassword=await this.encrypt.createHash(admin.password)
                    const newadmin={...admin,password:newPassword}
                   const a= await this.authRepository.signin(newadmin);
                return{
                    status:200,
                    data:"Sucessfully signed In"
                }
                }
                
            }
        }catch(err){
            throw err
        }
    }


    //to find and admin using _id
    async findById(id:string){
        try{
               const admin=await this.authRepository.findById(id)
               return{
                status:200,
                data:admin
               }
        }catch(err){
            throw err
        }
    }

    //to allow login a user using the email and password
    async login(admin:{email:string,password:string}){
        try{
            const Userlogin:any=await this.authRepository.findByemail(admin.email);
             if(Userlogin){
                if(await this.encrypt.compare(admin.password,Userlogin.password)){
                    if(Userlogin.admin){
                        const token=this.jwt.createJWT(Userlogin._id,Userlogin.admin)
                    return {
                        status:200,
                        data:{
                           message: "Logged In succesfully",
                           userId:Userlogin._id,
                           token,
                           role:Userlogin.role,
                           admin:Userlogin.admin
                        }
                    }
                    }
                    
                }else{
                    return {
                        status:200,
                        data:"Wrong Password"
                    } 
                }
        }}catch(err){
            console.log(err)
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

export default Adminauthusecase