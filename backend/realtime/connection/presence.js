import { presenceStore } from "../utils/presence.store.js";
import { presenceSubscriptions } from "../utils/presenceSubscription.store.js";

/**
 * CONNECT lifecycle: user comes online
 */
export async function handlePresence(io, socket, userId) {
  const roomId = `user:${userId}`;

  await socket.join(roomId);

  const { socketCount } = await presenceStore.addSocket(
    userId,
    socket.id
  );

  if (socketCount === 1) {
    presenceSubscriptions.emitOnline(io, userId);
  }
}