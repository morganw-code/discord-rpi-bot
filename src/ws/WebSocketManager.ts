import { connectWebSocket, WebSocket } from "https://deno.land/std/ws/mod.ts";

import { Constants, OPCODE } from "../constants/Constants.ts";
import { Heartbeat, Identify } from "../constants/Payloads.ts";

/*
    Discord Gateway Payload Structure

    op : opcode for the payload
    d  : event data
    s  : sequence number, used for resuming sessions and heartbeats
    t  : the event name for this payload
*/

export default class WebSocketManager {
  private socket!: WebSocket;
  private interval: any;
  public logging: boolean = false;
  async connect(token: string) {
    // connect to discord endpoint, initializing WebSocket object
    this.socket = await connectWebSocket(Constants.GATEWAY);
    // iterate over the payloads
    for await (const msg of this.socket) {
      const payload = JSON.parse(msg.toString());
      console.log(payload);
      // refer to payload structure comment block
      const {
        t: eventName,
        s: sequenceNumber,
        op: opcode,
        d: eventData,
      } = payload;

      const { heartbeat_interval } = eventData;

      switch (opcode) {
        // identify and send heartbeat
        case OPCODE.TEN:
          setInterval(() => {
            this.socket.send(JSON.stringify(Heartbeat));
          }, heartbeat_interval);
          await this.identify(token);
          break;
      }
    }
  }

  async identify(token: string) {
    Identify.d.token = token;
    return this.socket.send(JSON.stringify(Identify));
  }

  getSocket(): WebSocket {
    return this.socket;
  }
}
