// Setting up a Socket.IO server on port 8900 with CORS configuration.
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Array to store user information (userId and socketId).
let users = [];

// Function to add a user to the users array.
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Function to remove a user from the users array.
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Handling socket connection event.
io.on("connection", (socket) => {
  // Log when a user connects.
  console.log("a user connected.");

  // Handling "addUser" event to add user information and emit "getUsers" event to update clients.
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Handling "joinRoom" event to join a socket.io room.
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // Handling "sendMessage" event to send and broadcast messages.
  socket.on("sendMessage", (data) => {
    // Emitting "message" event to all users in the room.
    io.to(data.roomId).emit("message", data.message);

    // Broadcasting a notification to all users in the room except the sender.
    socket.to(data.roomId).emit("notification", {
      senderId: data.message.senderId,
      message: "New message received!",
    });
  });

  // Handling disconnection event.
  socket.on("disconnect", () => {
    // Log when a user disconnects.
    console.log("a user disconnected!");
    
    // Remove the disconnected user and emit "getUsers" event to update clients.
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
