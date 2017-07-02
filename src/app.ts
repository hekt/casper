import * as _ from 'lodash';
import * as Builder from 'botbuilder';
import * as Restify from 'restify';

const connector = new Builder.ChatConnector({
  appId: process.env.MSBF_APP_ID,
  appPassword: process.env.MSBF_APP_PASSWORD
});
const bot = new Builder.UniversalBot(connector);

bot.dialog('/', (session) => {});

bot.dialog('/task', [
  (session) => {
    session.send('called');
    session.endDialog();
  },
]).triggerAction({
  matches: /^Reminder: dialog:task.$/
})

const port = 8080;
const server = Restify.createServer();
server.listen(port, () => {
  console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());
server.listen()
