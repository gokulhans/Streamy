const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Use CORS to allow requests from specific origins
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"], // Add all allowed origins
    methods: ["GET", "POST"],
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"], // Add all allowed origins
    methods: ["GET", "POST"],
  },
});

let currentBox = 0;
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send the initial box state
  socket.emit('update', currentBox);

  // Listen for "move" events
  socket.on('move', (direction) => {
    if (direction === 'left' && currentBox > 0) {
      currentBox--;
    } else if (direction === 'right' && currentBox < 2) {
      currentBox++;
    }

    io.emit('update', currentBox);
  });

  // Listen for "control" events
  socket.on('control', (action) => {
    io.emit('control', action); // Broadcast control action to all clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});


const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
