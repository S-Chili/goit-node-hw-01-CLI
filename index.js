const { Command } = require('commander');
const contacts = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')
  .option('-l, --list', 'list all contacts')

program.parse(process.argv);

const { action, id, name, email, phone, list } = program.opts();

if (list) {
  contacts.listContacts().then((data) => console.log(data));
} else {
  invokeAction({ action, id, name, email, phone });
}

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then((data) => console.log(data));
      break;

    case 'get':
      contacts.getContactById(id).then((data) => console.log(data));
      break;

    case 'add':
      contacts.addContact(name, email, phone).then((data) => console.log(data));
      break;

    case 'remove':
      contacts.removeContact(id).then(() => console.log(`Contact with id ${id} removed`));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}