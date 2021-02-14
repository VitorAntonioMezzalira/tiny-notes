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

noteForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const input = e.target.querySelector('#note-input');
  const inputValue = input.value;
  input.value = '';

  createNote({ content: inputValue }).then(response => {
    console.log(response);
  });

});