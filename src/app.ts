import * as _ from 'lodash';
import * as Builder from 'botbuilder';
import * as Restify from 'restify';
import * as dotenv from 'dotenv';
dotenv.config();

const connector = new Builder.ChatConnector({
  appId: process.env.MSBF_APP_ID,
  appPassword: process.env.MSBF_APP_PASSWORD
});
const bot = new Builder.UniversalBot(connector);

bot.dialog('/', (session) => {});

bot.dialog('/task', [
  (session) => {
    session.send(
      '%s said: %s',
      session.message.address.user.name,
      session.message.text
    );
    session.endDialog();
  },
]).triggerAction({
  matches: /casper:task/
})

const port = 8080;
const server = Restify.createServer();
server.listen(port, () => {
  console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());
server.listen()
