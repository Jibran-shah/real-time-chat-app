import { handlePresence } from "../connection/presence.js";
import { hydrateUserRooms } from "../connection/hydrateRooms.js";
import { registerDisconnect } from "../connection/disconnect.js";

export async function connectionPlugin(io, socket) {
  const userId = socket.data.user.id;
  socket.data.ready = false;
  registerDisconnect(io, socket, userId);
  try {
    await handlePresence(io, socket, userId);
    const rooms = await hydrateUserRooms(userId);
    if (socket.disconnected) return;
    for (const roomId of rooms)
      await socket.join(roomId);
    socket.data.ready = true;

    socket.emit("connection.ready", {
      userId,
      roomsCount: rooms.length,
      timestamp: Date.now(),
    });

  } catch (err) {
    console.error("Connection initialization failed:", err);
    socket.emit("connection.failed", {
      reason: "CONNECTION_INITIALIZATION_FAILED",
      timestamp: Date.now(),
    });
  }
}