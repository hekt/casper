import * as Builder from 'botbuilder';
import * as Restify from 'restify';

const connector = new Builder.ChatConnector({
  appId: process.env.MSBF_APP_ID,
  appPassword: process.env.MSBF_APP_PASSWORD
});
const bot = new Builder.UniversalBot(connector);

bot.dialog('/', (session) => {
  session.send('hello');
});

const server = Restify.createServer();
server.listen(3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());
