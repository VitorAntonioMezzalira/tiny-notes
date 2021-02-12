// get cookie value
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

// fill the input user informations
getUser().then(response => {
  document.getElementById('name').value = response.name || '';
  document.getElementById('bio').value = response.bio || '';
  document.getElementById('image').value = response.image || '';
  document.getElementById('twitter').value = response.twitter || '';
  document.getElementById('instagram').value = response.instagram || '';
});

// get and test information
function getData() {
  return data = {
    _id: getCookie('_user_id'),
    name: document.getElementById('name').value,
    bio: document.getElementById('bio').value,
    image: document.getElementById('image').value,
    twitter: document.getElementById('twitter').value,
    instagram: document.getElementById('instagram').value
  };
};

// #####################################################################################

async function getUser() {
  const response = await fetch('http://localhost:5000/user/profile/' + getCookie('_user_id'));
  return response.json();
};

async function updateUser() {
  const data = getData();
  if (data.error) {
    return data;
  } else {
    const response = await fetch('http://localhost:5000/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
};

document.getElementById('accept').addEventListener('click', function (e) {
  e.preventDefault();
  updateUser();
  window.location.href = '/card-profile';
})