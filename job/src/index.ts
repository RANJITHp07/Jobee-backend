import { connect } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";
import {RabbitmqSave, RabbitmqUpdate, RabbitmqUpdateComment} from "./infrastructure/middleware/rabbitmqmiddleware";

const startServer = async () => {
  try {
    await connectDB();

    // rabbitMQ middlewares
    await connect();
    await RabbitmqUpdateComment()
    await RabbitmqSave();
    await RabbitmqUpdate()
    

    const app = createServer();


    //listener
    app?.listen(3000, () => {
      console.log("Connected to the server");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
