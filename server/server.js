const PORT = 5001;

const JOIN_ROOM_EVENT = "joinRoom";
const SCREEN_SHARE_EVENT = "screenShare";
const SHARE_STOP_EVENT = "stopShare"
const MOUSE_MOVEMENT_EVENT = "mouseMovement";
const MOUSE_CLICK_EVENT = "mouseClick";

const app = require('express')();
const server = require('http').createServer(app);
const {persistImage} = require("./persistImage");

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
      }
});
let roomImageSequence = new Map();

io.on("connection", (socket) => {
    console.log("socket: ", socket);

    socket.on(JOIN_ROOM_EVENT, (roomId, payload) => {
        console.log("Received joinRoom event, roomId: %s, payload: %s", roomId, payload);
        if (isBlank(roomId)) {
            return;
        }
        socket.join(JOIN_ROOM_EVENT);
        console.log("socket %s joined room %s", socket.id, roomId);
    });

    socket.on(SCREEN_SHARE_EVENT, (roomId, payload) => {
        console.log("Received %s event, roomId: %s, payload: %s", SCREEN_SHARE_EVENT, roomId, payload);
        if (isBlank(roomId)) {
            return;
        }
        let sequence = 0;
        if(roomImageSequence.has(roomId)){
            sequence = roomImageSequence.get(roomId);
        }
        else{
            roomImageSequence.set(roomId, 0);
        }
        persistImage(payload.image, roomId, sequence);
        sequence++;
        roomImageSequence.set(roomId, sequence);
        socket.to(roomId).emit(SCREEN_SHARE_EVENT, payload);
    });

    socket.on(SHARE_STOP_EVENT, (roomId, payload) => {
        console.log("Received %s event, roomId: %s, payload: %s", MOUSE_MOVEMENT_EVENT, roomId, payload);
        if (isBlank(roomId)) {
            return;
        }
        roomImageSequence.delete(roomId);
    })

    socket.on(MOUSE_MOVEMENT_EVENT, (roomId, payload) => {
        console.log("Received %s event, roomId: %s, payload: %s", MOUSE_MOVEMENT_EVENT, roomId, payload);
        if (isBlank(roomId)) {
            return;
        }
        socket.to(roomId).emit(MOUSE_MOVEMENT_EVENT, payload);
    });

    socket.on(MOUSE_CLICK_EVENT, (roomId, payload) => {
        console.log("Received %s event, roomId: %s, payload: %s", MOUSE_CLICK_EVENT, roomId, payload);
        if (isBlank(roomId)) {
            return;
        }
        socket.to(roomId).emit(MOUSE_CLICK_EVENT, payload);
    });

    socket.on("disconnecting", () => {
        console.log("Disconnecting... %s", socket.rooms);
    });
});


server.listen(PORT, ()=>{
    console.log("Server is up on port %s", PORT);
});


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}


