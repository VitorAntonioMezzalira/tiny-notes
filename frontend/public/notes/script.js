const noteForm = document.getElementById('note-form')
const notesList = document.getElementById('notes')
let notes = [
  { id: 0, content: 'I need to go to the market' },
  { id: 1, content: 'Leave clothes to wash' },
  { id: 2, content: 'Marcelo owes me 60 dollars' },
  { id: 3, content: 'Lorem ipsum dolor sit' },
  { id: 4, content: 'Lorem ipsum dolor sit' },
  { id: 5, content: 'Lorem ipsum dolor sit' },
  { id: 6, content: 'Lorem ipsum dolor sit' },
  { id: 7, content: 'Lorem ipsum dolor sit' },
  { id: 8, content: 'Lorem ipsum dolor sit' },
];


// noteForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const input = e.target.querySelector('#note-input')
//   const inputValue = input.value;
//   input.value = '';

//   if (inputValue) {
//     notes[notes.length] = { id: (notes.length), content: inputValue };
//     loadNotes();
//   };

// });

function loadNotes() {

  notesList.innerHTML = '';

  // generate notes
  notes.forEach(note => {
    if (note) {

      // list item
      const noteListItem = document.createElement('LI');
      noteListItem.setAttribute('class', 'note');
      noteListItem.setAttribute('key', note.id);

      // note content
      const noteListItemContent = document.createTextNode(note.content);
      const noteContentContainer = document.createElement('DIV');
      noteContentContainer.setAttribute('class', 'note-content-container');
      noteContentContainer.appendChild(noteListItemContent)
      noteListItem.appendChild(noteContentContainer);

      // note buttons
      const noteButtonsContainer = document.createElement('DIV');
      noteButtonsContainer.setAttribute('class', 'note-buttons-container');
      noteButtonsContainer.appendChild(createUpdateButton());
      noteButtonsContainer.appendChild(createDeleteButton());
      noteListItem.appendChild(noteButtonsContainer);

      notesList.appendChild(noteListItem);

    };
  });
};

loadNotes();

// CREATE BUTTONS
function createAcceptButton() {
  const noteAcceptButton = document.createElement('BUTTON');
  const noteAcceptButtonText = document.createTextNode('Accept');
  noteAcceptButton.appendChild(noteAcceptButtonText);
  createAcceptButtonFunction(noteAcceptButton);
  return noteAcceptButton
}

function createUpdateButton() {
  const noteUpdateButton = document.createElement('BUTTON');
  const noteUpdateButtonText = document.createTextNode('Update');
  noteUpdateButton.appendChild(noteUpdateButtonText);
  createUpdateButtonFunction(noteUpdateButton);
  return noteUpdateButton
};

function createDeleteButton() {
  const noteDeleteButton = document.createElement('BUTTON');
  const noteDeleteButtonText = document.createTextNode('Delete');
  noteDeleteButton.appendChild(noteDeleteButtonText);
  createDeleteButtonFunction(noteDeleteButton);
  return noteDeleteButton
};

// CREATE BUTTON FUNCTIONS
// accept
function createAcceptButtonFunction(button) {
  button.addEventListener('click', (e) => {

    const listItem = e.target.parentNode.parentNode;
    const noteKey = Number(listItem.getAttribute('key'));

    const noteFound = notes.filter(note => {
      if (note) {
        if (note.id === noteKey) {
          return true
        };
      }
    });

    notes[noteFound[0].id].content = listItem.querySelector('textarea').value;

    loadNotes()

  })
}

// delete
function createDeleteButtonFunction(button) {
  button.addEventListener('click', (e) => {

    const noteKey = Number(e.target.parentNode.parentNode.getAttribute('key'));

    notes.forEach((note, i) => {
      if (note) {
        if (note.id === noteKey) {
          notes[i] = undefined;
        };
      };
    });

    loadNotes();

  });
};

// update
function createUpdateButtonFunction(button) {
  button.addEventListener('click', (e) => {

    const listItem = e.target.parentNode.parentNode;
    listItem.innerHTML = '';
    const noteKey = Number(listItem.getAttribute('key'));
    console.log(noteKey)

    const noteFound = notes.filter(note => {
      if (note) {
        if (note.id === noteKey) {
          return true
        };
      };
    });

    // note content
    const noteUpdateInput = document.createElement('TEXTAREA');
    noteUpdateInput.value = noteFound[0].content;
    const noteContentContainer = document.createElement('DIV');
    noteContentContainer.setAttribute('class', 'note-content-container');
    noteContentContainer.appendChild(noteUpdateInput);
    listItem.appendChild(noteContentContainer);

    // note buttons
    const noteButtonsContainer = document.createElement('DIV');
    noteButtonsContainer.setAttribute('class', 'note-buttons-container');
    noteButtonsContainer.appendChild(createAcceptButton());
    noteButtonsContainer.appendChild(createDeleteButton());
    listItem.appendChild(noteButtonsContainer);

  });
};