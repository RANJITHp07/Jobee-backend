interface INodemailer{
    generateOTP():string,
    sendEmailVerification(email: string, username: string):Promise<unknown>,
    verifyEmail(enteredOTP: string, email: string):Promise<unknown>,
}

export default INodemailer