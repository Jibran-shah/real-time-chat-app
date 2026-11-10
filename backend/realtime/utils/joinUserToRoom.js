export const joinUsersToRoom = async (io, roomId, userIds) => {
  console.log("Joining users to room:", roomId);
  console.log("Users:", userIds);
  const results = await Promise.all(

    userIds.map(async (userId) => {
      try {
        const sockets = await io.in(`user:${userId}`).fetchSockets();

        if (!sockets.length) {
          console.log(`[OFFLINE] User ${userId} has no connected sockets`);
          return { userId, status: "OFFLINE" };
        }

        const joined = await Promise.all(
          sockets.map(async (socket) => {
            await socket.join(roomId);
            const success = socket.rooms.has(roomId);
            console.log(
              `[${success ? "SUCCESS" : "FAILED"}]`,
              `User: ${userId}`,
              `Socket: ${socket.id}`,
              `Room: ${roomId}`
            );

            return success;
          })
        );

        return {
          userId,
          status: joined.every(Boolean) ? "JOINED" : "PARTIAL",
          socketCount: sockets.length,
        };
      } catch (error) {
        console.error(`[ERROR] Failed to join user ${userId}:`, error);

        return { userId, status: "FAILED", error: error.message };
      }
    })
  );

  console.log("Room joining results:", results);

  return results;
};