const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {
    console.log("socket: ", socket);
    console.log("Socket is active to be connected");

    socket.on("joinRoom", (roomId, payload) => {
        console.log("roomId: %s, joinRoom payload: %s", roomId, payload);

        socket.join(roomId);

        // For screen share
        socket.on("screenShare", (roomId, payload) => {
            console.log("roomId: %s, screenShare payload: %s", roomId, payload);

            io.to(roomId).emit("screenShare", payload);
        });

        // for mouse movement
        socket.on("mouseMovement", (roomId, payload) => {
            console.log("roomId: %s, mouseMovement payload: %s", roomId, payload);

            io.to(roomId).emit("mouseMovement", payload);
        });

        //for mouse click
        socket.on("mouseClick", (roomId, payload) => {
            console.log("roomId: %s, mouseClick payload: %s", roomId, payload);

            io.to(roomId).emit("mouseClick", payload);
        });
    });

    socket.on("disconnecting", () => {
        console.log("Disconnecting... %s", socket.rooms);
      });
});

server.listen(5000, ()=>{
    console.log("Server is up on port 5000")
});
