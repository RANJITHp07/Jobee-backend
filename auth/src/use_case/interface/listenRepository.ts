interface IListner{
    listen(exchange: string, routingKey: string, callback: (data: any) => void):Promise<unknown>

}

export default IListner