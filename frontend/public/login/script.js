async function confirmUser() {
  const data = getData()
  const response = await fetch('http://localhost:5000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

function getData() {
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  return data;
};

document.getElementById('login').addEventListener('click', function(e) {
  e.preventDefault();
  confirmUser().then(response => {
    console.log(response)
    if(response.error) {
      showMessage(response.error, 'red')
    } else {
      console.log('success')
      showMessage('Login success', 'green')
      const d = new Date()
      document.cookie = '_user_id=' + response._id + '; expires=' + new Date(2021, (d.getMonth() + 1), 1) + ': HttpOnly';
      window.location.href = '/card-profile';
    };
  });
});

// esse trecho deve ser colocado em um arquivo global
function showMessage(message, color) {
  document.querySelector('.message').innerText = message
  if (color === 'red') {
    document.querySelector('.message').style.color = '#ff3333';
  } else if (color === 'green') {
    document.querySelector('.message').style.color = '#33ff33';
  };
};