import events from "events";

class userEmit extends events.EventEmitter {}
const userEmitter = new userEmit();

export default userEmitter;