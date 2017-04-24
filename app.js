const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('inicio');
});

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
