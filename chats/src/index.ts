
import { connect } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";
import { Rabbitmqcreate, Rabbitmqupadte } from "./infrastructure/middleware/rabbitmqMiddleware";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    await connect();
    await Rabbitmqcreate();
    await Rabbitmqupadte()

    const app = createServer()

    app?.listen(3000, () => {
      console.log("Connected to the server");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
