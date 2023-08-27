interface User{
    _id:string,
    userId?:string,
    address:string,
    phoneNumber:number,
    photo:string,
    profileSummary:string,
    skills:string[],
    education:string,
    experience:string
    language:string[],
    achivements:string
}

export default User