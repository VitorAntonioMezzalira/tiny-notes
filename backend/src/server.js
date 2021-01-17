const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Connection = require('./connection');

const UserModel = require('./models/userModel');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.get('/user/profile/:_id', (req, res) => {
  findUserById(req.params._id).then(response => {
    if(response === null) {
      res.send({ error: '404 Not Found' }).status(404);
    } else {
      res.send({
        name: response.name,
        bio: response.bio,
        image: response.image,
        twitter: response.twitter,
        instagram: response.instagram
      });
    };
  });
});

app.post('/user/register', (req, res) => {
  findOneUser(req.body).then(response => {
    if (response === null) {
      insertUser(req.body).then(response => { res.send(response).status(200) });
    } else {
      res.send({ error: 'Email already in use' }).status(200);
    };
  });
});

app.post('/user/login', (req, res) => {
  findOneUser(req.body).then(response => {
    if (response === null) {
      res.send({ error: 'Email or Password invalid' }).status(200);
    } else if (response.password === req.body.password) {
      res.send({
        _id: response._id
      }).status(200);
    } else {
      res.send({ error: 'Email or Password invalid' }).status(200);
    };
  });
});

findUserById = async (id) => {
  return await UserModel.findById({ _id : id });
}

findOneUser = async (dataUser) => {
  return await UserModel.findOne({ email: dataUser.email })
};

insertUser = async (dataUser) => {
  const newUser = await new UserModel({
    name: dataUser.name,
    email: dataUser.email,
    password: dataUser.password
  });
  return await newUser.save()
};

// ####################################################################################
// ####################################################################################

// route
app.get('/users', (req, res) => {
  getAllUsers().then(response => {
    res.send(response).status(200);
  });
});
// query
getAllUsers = () => new Promise((resolve, reject) => {
  UserModel.find({}, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    };
  });
});

// ####################################################################################
// ####################################################################################

Connection('mongodb://localhost:27017/tiny-notes');
app.listen(5000, () => console.log('server is running at http://localhost:5000'));