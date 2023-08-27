import amqp, { Channel, Connection } from "amqplib";

let channel: Channel | undefined;
let connection: Connection | undefined;


// connect is used to create an rabbitmq channel
const connect = async function (): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const amqpServer = "amqp://rabbitmq-srv:5672";
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      console.log("Channel created");
      resolve(); 
    } catch (err) {
      console.error("Error connecting to RabbitMQ:", err);
      reject(err)
    }
  });
};

export { channel, connection, connect };
