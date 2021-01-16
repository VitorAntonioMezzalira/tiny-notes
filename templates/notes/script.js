const noteForm = document.getElementById('note-form')
const notesList = document.getElementById('notes')
let notes = [
  { id: 0, content: 'I need to go to the market to buy apples' },
  { id: 1, content: 'Leave clothes to wash' },
  { id: 2, content: 'Marcelo owes me 60 dollars' },
];

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = e.target.querySelector('#note-input').value;

  if (inputValue) {
    notes[notes.length] = { id: (notes.length), content: inputValue };
    loadNotes();
  };

});

function loadNotes() {

  notesList.innerHTML = '';

  // generate notes
  notes.forEach(note => {
    if (note) {

      // note
      const noteListItemContent = document.createTextNode(note.content);

      // list item
      const noteListItem = document.createElement('LI');
      noteListItem.setAttribute('class', 'note');
      noteListItem.setAttribute('key', note.id);

      noteListItem.appendChild(noteListItemContent);
      noteListItem.appendChild(createUpdateButton());
      noteListItem.appendChild(createDeleteButton());

      notesList.appendChild(noteListItem);

    };
  });

};



loadNotes();

// CREATE SIMPLE BUTTONS
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

// CREATE FUNCTION BUTTONS

// accept
function createAcceptButtonFunction(button) {
  button.addEventListener('click', (e) => {
    
    const listItem = e.target.parentNode;
    // listItem.innerHTML = '';
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

    const noteKey = Number(e.target.parentNode.getAttribute('key'));

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

    const listItem = e.target.parentNode;
    listItem.innerHTML = '';
    const noteKey = Number(listItem.getAttribute('key'));

    const noteFound = notes.filter(note => {
      if (note) {
        if (note.id === noteKey) {
          return true
        };
      }
    });

    const noteUpdateInput = document.createElement('TEXTAREA');
    noteUpdateInput.value = noteFound[0].content;
    listItem.appendChild(noteUpdateInput);
    listItem.appendChild(createAcceptButton());
    listItem.appendChild(createDeleteButton());

  });
};