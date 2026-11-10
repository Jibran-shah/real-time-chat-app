import { Server } from "socket.io";
import { socketAuth } from "./security/socketAuth.js";
import { setupSocketRedisAdapter } from "./utils/setup/socketRedisAdapter.js";
import { connectProducer } from "../kafka/producer.js";
import { registerPlugins } from "./plugins/registorPlugins.js";


let io;

export async function initSocket(server) {

  const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map(o => o.trim());
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST"]
    }
  });

  io.use((socket, next) => {
    socketAuth(socket, (err) => {
      if (err) 
        console.error("SOCKET AUTH ERROR:", err);
      else
        console.log("SOCKET AUTH SUCCESS:", socket.id);
      next(err);
    });
  });

  try {
    await Promise.all([
      setupSocketRedisAdapter(io),
      connectProducer()
    ]);
  } catch (err) {
    throw err;
  }

  io.on("connection", async (socket) => {
    socket.on("disconnect", (reason) => {});
    try {
      await registerPlugins(io, socket);
    } catch (err) {
      socket.disconnect(true);
    }
  });

  return io;
}



export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};