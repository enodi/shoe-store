const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:8080/");
const store = { aldoStore: [] };
let filteredItems = [];
let itemFound = false;
const writeToFile = (message) => {
  fs.readFile("server/data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      const result = JSON.parse(data);
      const parsedMessage = JSON.parse(message);
      filteredItems =
        result &&
        result.aldoStore.map((item) => {
          if (
            item.store === parsedMessage.store &&
            item.model === parsedMessage.model
          ) {
            item.inventory = parsedMessage.inventory;
            itemFound = true;
          }
          return item;
        });
    }
  });

  if (itemFound) {
    store.aldoStore.splice(0, store.aldoStore.length, ...filteredItems);
    itemFound = false;
  } else {
    store.aldoStore.push(JSON.parse(message));
  }

  setInterval(() => {
    fs.writeFile(
      "server/data.json",
      JSON.stringify(store, null, 2),
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }, 3000);
};

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
  writeToFile(message);
});

ws.on("close", () => {
  console.log("disconnected");
});
