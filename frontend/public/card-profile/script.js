function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
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

async function getUser() {
  const userId = getCookie('_user_id')
  if (userId) {
    const response = await fetch('http://localhost:5000/user/profile/' + userId);
    return response.json();
  } else {
    window.location.href = '/login';
  };
};

getUser().then(response => {
  
  if(response.name) {
    document.getElementById('name').innerText = response.name;
  };
  if(response.bio) {
    document.getElementById('bio').innerText = response.bio;
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

function resizeProfileImage() {

  const profileImage = document.getElementById('image');
  let imageWidth = profileImage.clientWidth;
  let imageHeight = profileImage.clientHeight;
  
  if (imageWidth > imageHeight) {
    profileImage.style.width = 'auto';
    profileImage.style.height = '100%';
    imageWidth = profileImage.clientWidth;
    profileImage.style.marginLeft = '-' + ((imageWidth - 120) / 2) + 'px'
  } else {
    profileImage.style.width = '100%';
    profileImage.style.height = 'auto';
    imageHeight = profileImage.clientHeight;
    profileImage.style.marginTop = '-' + ((imageHeight - 120) / 2) + 'px'
  };

};

function userSignOut() {
  document.cookie = '_user_id=none; expires=' + new Date() + ': HttpOnly';
  window.location.href = '/login';
}
