import * as Builder from "botbuilder";
import * as dotenv from "dotenv";
import * as Restify from "restify";

dotenv.config();

const connector: Builder.ChatConnector = new Builder.ChatConnector({
  appId: process.env.MSBF_APP_ID,
  appPassword: process.env.MSBF_APP_PASSWORD,
});
const bot: Builder.UniversalBot = new Builder.UniversalBot(connector);

bot.dialog("/", (session: Builder.Session): void => {
  console.log("root dialog");
});

bot.dialog("/task", [
  (session: Builder.Session): void => {
    session.send(
      "%s said: %s",
      session.message.address.user.name,
      session.message.text
    );
    session.endDialog();
  },
]).triggerAction({
  matches: /casper:task/,
});

const port = 8080;
const server = Restify.createServer();
server.listen(port, () => {
  console.log("%s listening to %s", server.name, server.url);
});
server.post("/api/messages", connector.listen());
server.listen();
