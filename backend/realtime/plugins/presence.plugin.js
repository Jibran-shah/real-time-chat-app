import { presenceSubscriptions } from "../utils/presenceSubscription.store.js";

/**
 * Presence plugin:
 * Handles client subscription to presence updates only.
 */
export function presencePlugin(io, socket) {

  socket.on("presence.subscribe", ({ targetUserId }) => {
    if (!targetUserId) return;
    socket.join(presenceSubscriptions.channel(targetUserId));
  });

  socket.on("presence.unsubscribe", ({ targetUserId }) => {
    if (!targetUserId) return;
    socket.leave(presenceSubscriptions.channel(targetUserId));
  });
}