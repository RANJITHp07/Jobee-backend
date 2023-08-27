import { connect } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";
import { saveRabbitmq,updateRabbitmq } from "./infrastructure/middleware/rabbitmqMiddleware";


const startServer = async () => {
  try {
    await connectDB();
    await connect();
    await updateRabbitmq()
    await saveRabbitmq();
    

    const app = createServer();

    app?.listen(process.env.PORT, () => {
      console.log("Connected to the server");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
