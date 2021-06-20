const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

wss.broadcast = function (data, sender) {
  wss.clients.forEach(function (client) {
    if (client !== sender) {
      client.send(data);
    }
  });
};
wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (data) => {
    console.log(data);
    ws.send(data.toUpperCase());
    wss.broadcast(data, ws);
  });
  ws.on("close", () => {
    console.log("disconnected");
  });
});
