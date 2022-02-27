import {Command} from "../command";

export default new Command('ping', 'Replies with a Pong!', i => i.reply({content: "Pong!", ephemeral: true}));