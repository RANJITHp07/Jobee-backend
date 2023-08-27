interface Auth{
    _id?:string,
    username:string,
    email:string,
    password?:string,
    admin?:boolean,
    credentials?:string
}

export default Auth