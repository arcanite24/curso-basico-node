const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/curso');

const userSchema = mongoose.Schema({
  nombre: String,
  edad: Number,
  sexo: Boolean,
  fechaNacimiento: Date
});

const User = mongoose.model('User', userSchema);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('inicio');
});

app.get('/user/agregar', (req, res) => {
  return res.render('user/user_new');
});

app.get('/user', (req, res) => {
  User.find((err, users) => {
    if(err) return res.view('error');
    res.render('user/user_all', {users: users});
  });
});

app.get('/user/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if(err) return res.view('error');
    res.render('user/user_detail', {user: user});
  })
}); 

app.post('/user', (req, res) => {
  let nombre = req.body.nombre;
  let edad = req.body.edad;
  let sexo = req.body.sexo;
  let fechaNacimiento = req.body.fechaNacimiento;

  let user = new User({
    nombre: nombre,
    edad: edad,
    sexo: sexo,
    fechaNacimiento: fechaNacimiento
  });

  user.save((err, user) => {
    if(err) return res.render('error');
    res.render('user/user_agregado');
  });

});

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
