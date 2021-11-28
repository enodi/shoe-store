const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:8080/");
const store = { aldoStore: [] };

ws.on("open", () => {
  ws.send("connection opened");
});

ws.on("error", (error) => {
  console.log(
    "An error occurred while connecting to the websocket adapter",
    error
  );
});

ws.on("message", (message) => {
  store.aldoStore.push(JSON.parse(message));
  fs.writeFileSync("server/data.json", JSON.stringify(store, null, 2));
});

ws.on("close", () => {
  console.log("disconnected");
});
