import { connect } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";
import { saveRabbitmq,updateRabbitmq } from "./infrastructure/middleware/rabbitmqMiddleware";


const startServer = async () => {
  try {
    await connectDB();

    //rabbitMQ middlewares
    await connect();
    await updateRabbitmq()
    await saveRabbitmq();
    

    const app = createServer();

    app?.listen(3000, () => {
      console.log("Connected to the server");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
