declare global {
  interface Liveblocks {
    Presence: {};
    Storage: {};
    UserMeta: {
      id: string;
      info: {
        name: string;
        color: string;
      };
    };
    RoomEvent: {};
    ThreadMetadata: {};
    RoomInfo: {};
  }
}

export {};
