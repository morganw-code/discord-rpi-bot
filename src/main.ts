// import { connectWebSocket } from "https://deno.land/std/ws/mod.ts";

// // https://discord.com/developers/docs/topics/gateway
// const GATEWAY = "wss://gateway.discord.gg/?v=6&encoding=json";

// try {
//   const socket = await connectWebSocket(GATEWAY);
//   if (!socket.isClosed) {
//     console.log("Connected!");
//   }

//   for await (const message of socket) {
//     const payload = JSON.parse(message.toString());
//     let parsedPayload = {
//       opcode: payload.op,
//       eventData: payload.d,
//       sequenceNumber: payload.s,
//       eventName: payload.t,
//     } = payload;
//     const { heartbeat_interval } = parsedPayload.eventData;
//     const responsePayload = { op: 1, d: null };

//     // https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-opcodes
//     switch (op) {
//       // op code 10 contains the heartbeat interval
//       case 10:
//         setInterval(() => {
//           console.log(
//             `Sending heartbeat every ${heartbeat_interval} milliseconds`
//           );
//           socket.send(JSON.stringify(responsePayload));
//         }, heartbeat_interval);
//         const token = Deno.env.get("TOKEN");
//         const properties = {
//           $os: "linux",
//           $browser: "deno-discord",
//           $device: "deno-discord",
//         };
//         const identify = {
//           op: 2,
//           d: { token, properties },
//         };
//         socket.send(JSON.stringify(identify));
//         break;
//     }
//     console.log(payload);
//   }
// } catch (err) {
//   console.log(err);
// }

import "https://deno.land/x/dotenv/load.ts";
import WebSocketManager from "./ws/WebSocketManager.ts";
import { Constants } from "./constants/Constants.ts";

const webSocketManager = new WebSocketManager();
webSocketManager.logging = true;

const token = Deno.env.get("TOKEN");
if(token !== undefined) {
  webSocketManager.connect(token);
  // if(webSocketManager.getSocket().isClosed) {
  //   throw new Error(`Could not connect to endpoint: ${Constants.GATEWAY}`);
  // }
} else {
  throw new Error("Token was undefined");
}