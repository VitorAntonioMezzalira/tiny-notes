function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function getUser() {
  const response = await fetch('http://localhost:5000/user/profile/' + getCookie('_user_id'));
  return response.json();
}

getUser().then(response => {
  
  if(response.name) {
    document.getElementById('name').innerText = response.name
  };
  if(response.bio) {
    document.getElementById('bio').innerText = response.bio
  };
  if(response.image) {
    document.getElementById('image').setAttribute('src', response.image);
  };
  if(response.twitter) {
    document.getElementById('twitter').setAttribute('href', response.twitter);
  };
  if(response.instagram) {
    document.getElementById('instagram').setAttribute('href', response.instagram);
  };
})
