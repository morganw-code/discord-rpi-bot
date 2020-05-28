import { connectWebSocket } from "https://deno.land/std/ws/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

// https://discord.com/developers/docs/topics/gateway
const GATEWAY = "wss://gateway.discord.gg/?v=6&encoding=json";

/*
    Discord Gateway Payload Structure

    op : opcode for the payload
    d  : event data
    s  : sequence number, used for resuming sessions and heartbeats
    t  : the event name for this payload
*/

try {
  const socket = await connectWebSocket(GATEWAY);
  if (!socket.isClosed) {
    console.log("Connected!");
  }

  for await (const message of socket) {
    const payload = JSON.parse(message.toString());
    const { t, s, op, d } = payload;
    const parsedPayload: {
      opcode: number;
      eventData: any;
      sequenceNumber: number;
      eventName: string;
    } = {
      opcode: op,
      eventData: d,
      sequenceNumber: s,
      eventName: t,
    };
    const { heartbeat_interval } = parsedPayload.eventData;
    const responsePayload = { op: 1, d: null };

    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-opcodes
    switch (op) {
      // op code 10 contains the heartbeat interval
      case 10:
        setInterval(() => {
          console.log(
            `Sending heartbeat every ${heartbeat_interval} milliseconds`
          );
          socket.send(JSON.stringify(responsePayload));
        }, heartbeat_interval);
        const token = Deno.env.get("TOKEN");
        const properties = {
          $os: "linux",
          $browser: "deno-discord",
          $device: "deno-discord",
        };
        const identify = {
          op: 2,
          d: { token, properties },
        };
        socket.send(JSON.stringify(identify));
        break;
    }
    console.log(payload);
  }
} catch (err) {
  console.log(err);
}
