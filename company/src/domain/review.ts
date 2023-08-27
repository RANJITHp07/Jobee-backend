interface Review{
    _id?:string,
    review:{
        username:string
        comment:string,
        rating:number
    },
    totalrating?:number
}

export default Review