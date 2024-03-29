import { connect } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";
import { rabbitmqSave,rabbitmqUpdate } from "./infrastructure/middleware/rabbitmqMiddleware";

const startServer = async () => {
  try {
    await connectDB();

    //rabbitMQ middlewares
    await connect();
    await rabbitmqSave()
    await rabbitmqUpdate()
    

    const app = createServer();

    //server listening
    app?.listen(3000, () => {
      console.log("Connected to the server");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
