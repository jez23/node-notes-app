const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes(title, body);
    const duplicateTitle = notes.filter(note => note.title === title)
    if(duplicateTitle.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added'));
    } else {
        console.log(chalk.bgRed('Note title is taken'));
    }
    

}

const removeNote = (title) => {
    const notes = loadNotes();
    let index = notes.findIndex(note => note.title === title)
    if(index > -1){
        notes.splice(index, 1);
        saveNotes(notes);
        console.log(chalk.bgGreen('Note removed'));
    } else{
        console.log(chalk.bgRed('No note found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.underline.bold.blueBright('Your notes'))
    for(let title in notes){
        console.log(notes[title].title)
    }
}


const saveNotes = (notesArray) => {
   const dataJSON = JSON.stringify(notesArray);
   fs.writeFileSync('note.json', dataJSON);
}

const readNote = (title) => {
    const notes = loadNotes();
    const selectedNote = notes.find(note => {
        return note.title === title
    });
    if(selectedNote){
        console.log(chalk.underline.bold.blueBright(selectedNote.title))
        console.log(selectedNote.body)
    } else {
        console.log(chalk.bgRed('Error: Not Found'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('note.json');
        const dataBufferToString = dataBuffer.toString();
        return JSON.parse(dataBufferToString);
    } catch (e){
         return [];
    }
   
    
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};