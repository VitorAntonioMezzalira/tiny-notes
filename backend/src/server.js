const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Connection = require('./connection');
const mongoose = require('mongoose');

const UserModel = require('./models/userModel');
const NoteModel = require('./models/noteModel');

mongoose.set('useFindAndModify', false)

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.get('/user/profile/:_id', (req, res) => {
  findUserById(req.params._id).then(response => {
    if (response === null) {
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

app.post('/user/update', (req, res) => {
  updateUser(req.body).then(response => {
    res.send(response)
  })
});

// queries
findUserById = async (id) => {
  return await UserModel.findById({ _id: id });
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

updateUser = async (dataUser) => {
  const response = UserModel.updateOne({ _id: dataUser._id }, {
    name: dataUser.name,
    bio: dataUser.bio,
    image: dataUser.image,
    twitter: dataUser.twitter,
    instagram: dataUser.instagram
  });
  return response
};

// #############################################################################
// notes routers
app.post('/note/create', (req, res) => {
  insertNote(req.body).then(response => {
    if (response._id) {
      getNotes(req.body).then(response_2 => {
        res.send(response_2).status(200);
      });
    } else {
      res.status(500)
    }
  });
});

app.put('/note/update', (req, res) => {
  updateNote(req.body).then(response => {
    if (response.content == req.body.content) {
      res.send({ content: response.content }).status(200);
    } else {
      res.status(500);
    }
  });
});

app.delete('/note/delete', (req, res) => {
  deleteNote(req.body).then(response => {
    if (response._id == req.body.note_id) {
      getNotes(req.body).then(response_2 => {
        res.send(response_2).status(200);
      });
    } else {
      res.status(500)
    }
  });
});

app.get('/notes/user/:user_id', (req, res) => {
  getNotes(req.params).then(response => {
    res.send(response);
  });
});

// queries
insertNote = async (data) => {
  const newNote = await new NoteModel({
    user_id: data.user_id,
    content: data.content
  });
  return await newNote.save();
};

updateNote = async (data) => {
  return await NoteModel.findByIdAndUpdate({ _id: data.note_id }, { content: data.content }, { new: true });
}

deleteNote = async (data) => {
  return await NoteModel.findByIdAndDelete({ _id: data.note_id });
};

getNotes = async (data) => {
  return await NoteModel.find({ user_id: data.user_id }, 'content');
};

Connection('mongodb://localhost:27017/tiny-notes');
app.listen(5000, () => console.log('server is running at http://localhost:5000'));