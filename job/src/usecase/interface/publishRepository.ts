interface IPublish{
    publish(exchange: string, routingKey: string, data: unknown): Promise<boolean>
}

export default IPublish