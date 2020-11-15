const yargs = require('yargs');

const notes = require('./note.js');


//Customize yargs verrsion
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    description: 'Add a new note',
    handler(argv)  {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    description: 'Remove a note',
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create read command
yargs.command({
    command: 'read',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    description: 'Read a note',
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//Create read command
yargs.command({
    command: 'list',
    description: 'List a note',
    handler(){
        notes.listNotes();
    }
})



yargs.parse();

