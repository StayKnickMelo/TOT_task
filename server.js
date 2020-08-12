const express = require('express');
const config = require('config');
const path = require('path');
const connectDB = require('./config/db');

const auth = require('./routes/auth');
const flood = require('./routes/flood');

const app = express();

app.use(express.json({ extended: false }));

connectDB();

app.use('/auth', auth);
app.use('/flood', flood);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});