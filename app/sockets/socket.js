import { io } from "socket.io-client";

const socketUrl = "http://192.168.29.211:8100";

//const socketUrl = 'https://rooms.grovyo.xyz';
const socket = io(socketUrl, {
  reconnectionAttempts: 100,
  reconnectionDelay: 3000,
  reconnection: true,
  autoConnect: true,
  transports: ["websocket"],
});

if (socket.connected) {
} else {
  if (!socket.connected) {
    socket.connect();
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  }
}

//emitting function
export const socketemitfunc = async ({ event, data }) => {
  console.log("Socket Connection:", socket.connected);
  if (!socket.connected) {
    socket.connect();
    socket.emit(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    console.log("Connecting...");
    socket.emit(event, data);
  }
};

//function for listening
export const socketonfunc = async ({ event, data }) => {
  if (!socket.connected) {
    socket.connect();
    socket.on(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    socket.emit(event, data);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
  console.log("Socket disconnected manually");
};
export default socket;
