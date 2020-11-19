import io from "socket.io-client";
import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:8080", { transports: ["websocket"] });
const Client = feathers();

Client.configure(socketio(socket));

Client.configure(
  auth({
    storageKey: "auth-key",
    storage: window.localStorage,
  })
);

export default Client;
