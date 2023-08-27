interface INodemailerRepository{
    generate(email:string)
    compare(email:string,otp:string):string
}

export default INodemailerRepository