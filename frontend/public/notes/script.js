function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    };
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    };
  };
  return "";
};

let notes = [];
const noteForm = document.getElementById('note-form')
const notesList = document.getElementById('notes')


// get all notes
async function getUserNotes() {
  const response = await fetch('http://localhost:5000/notes/user/' + getCookie('_user_id'));
  return response.json();
};
getUserNotes().then(response => {
  notes = response;
  loadNotes()
})

// ACTIONS
// create new note
async function createNote(data) {
  const response = await fetch('http://localhost:5000/note/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// update note
async function updateUserNote(data) {
  const response = await fetch('http://localhost:5000/note/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

// delete note
async function deleteUserNote(data) {
  const response = await fetch('http://localhost:5000/note/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

function loadNotes() {

  notesList.innerHTML = '';

  // generate notes
  notes.forEach(note => {
    if (note) {

      // list item
      const noteListItem = document.createElement('LI');
      noteListItem.setAttribute('class', 'note');
      noteListItem.setAttribute('key', note._id);

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
    const note_id = listItem.getAttribute('key');

    const data = {
      user_id: getCookie('_user_id'),
      note_id: note_id,
      content: listItem.querySelector('textarea').value
    };
    listItem.innerHTML = '';

    updateUserNote(data).then(response => {

      // note content
      const noteListItemContent = document.createTextNode(response.content);
      const noteContentContainer = document.createElement('DIV');
      noteContentContainer.setAttribute('class', 'note-content-container');
      noteContentContainer.appendChild(noteListItemContent)
      listItem.appendChild(noteContentContainer);

      // note buttons
      const noteButtonsContainer = document.createElement('DIV');
      noteButtonsContainer.setAttribute('class', 'note-buttons-container');
      noteButtonsContainer.appendChild(createUpdateButton());
      noteButtonsContainer.appendChild(createDeleteButton());
      listItem.appendChild(noteButtonsContainer);
    });

  });
};

// delete
function createDeleteButtonFunction(button) {
  button.addEventListener('click', (e) => {

    const data = {
      user_id: getCookie('_user_id'),
      note_id: e.target.parentNode.parentNode.getAttribute('key')
    }

    deleteUserNote(data).then(response => {
      notes = response;
      loadNotes()
    });

  });
};

// update
function createUpdateButtonFunction(button) {
  button.addEventListener('click', (e) => {

    const listItem = e.target.parentNode.parentNode;
    const content = listItem.querySelector('.note-content-container').innerHTML

    listItem.innerHTML = '';

    // note content
    const noteUpdateInput = document.createElement('TEXTAREA');
    noteUpdateInput.value = content;
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

noteForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const input = e.target.querySelector('#note-input');
  const inputValue = input.value;
  input.value = '';

  createNote({ content: inputValue, user_id: getCookie('_user_id') }).then(response => {
    notes = response;
    loadNotes();
  });

});