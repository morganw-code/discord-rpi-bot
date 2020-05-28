export enum Constants {
  GATEWAY = "wss://gateway.discord.gg/?v=6&encoding=json",
}

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-opcodes
export enum OPCODE {
  DISPATCH = 0,
  HEARTBEAT = 1,
  IDENTIFY = 2,
  PRESENCE_UPDATE = 3,
  VOICE_STATE_UPDATED = 4,
  RESUME = 6,
  RECONNECT = 7,
  REQUEST_GUILD_MEMBERS = 8,
  INVALID_SESSION = 9,
  HELLO = 10,
  HEARTBEAT_ACK = 11,
}