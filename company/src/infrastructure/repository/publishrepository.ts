import { Channel, Connection } from "amqplib";
import { channel, connection, connect } from "../config/rabbitmq";
import IPublish from "../../usecase/interface/publishRepository";

class Publisher implements IPublish{
  private channel: Channel | undefined;
  private connection: Connection | undefined;
  private isConnected: boolean;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
    this.isConnected = false;
  }

  // this is used to publish any data through the channels
  async publish(exchange: string, routingKey: string, data: unknown): Promise<boolean> {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct");
      const sent = await new Promise<boolean>((resolve, reject) => {
        this.channel!.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(data)),
          { persistent: true }
        );
        resolve(true);
      });

      return sent;
    } catch (err) {
      console.error("Error in publish:", err);
      return false;
    }
  }

  //this is to ensure that the connection is established
  private async ensureConnection() {
    if (!this.isConnected) {
      await connect();
      this.channel = channel;
      this.connection = connection;
      this.isConnected = true;
    }
  }
}

export default Publisher;
