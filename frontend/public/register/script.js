async function createUser() {
  const data = getData();
  if (data.error) {
    return data
  } else {
    const response = await fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
};

function getData() {

  const dataForTest = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    repassword: document.getElementById('repassword').value,
  }
  // REGISTER ERRORS
  // invalid name
  if(dataForTest.name === '') {
    dataForTest.error =  'Invalid name';
    return dataForTest;
  };
  // invalid email
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(dataForTest.email)) {
    dataForTest.error = 'Invalid email';
    return dataForTest;
  };
  // password do not match
  if (dataForTest.password !== dataForTest.repassword) {
    dataForTest.error = 'Password do not match';
    return dataForTest;
  };
  // password to short
  if (dataForTest.password.length < 8) { 
    dataForTest.error = 'Password must be 8 characters';
    return dataForTest;
  };
  const data = {
    name: dataForTest.name,
    email: dataForTest.email,
    password: dataForTest.password
  };
  return data
};

document.getElementById('register').addEventListener('click', function (e) {
  e.preventDefault();
  createUser().then(response => {
    if (response.error) {
      showMessage(response.error, 'red');
    } else {
      console.log(response)
      showMessage('User Created. Please, do login', 'green');
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