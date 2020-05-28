export const Heartbeat = {
  op: 1,
  d: null,
};

export const Identify: {
  op: number;
  d: {
    token: string;
    properties: {
      $os: string;
      $browser: string;
      $device: string;
    };
  };
} = {
  op: 2,
  d: {
    token: "",
    properties: {
      $os: "linux",
      $browser: "rpi",
      $device: "rpi",
    },
  },
};
