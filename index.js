const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models/db');
const env = require('dotenv').config()
app.use(express.static(path.join(__dirname, "/client/build/")));
app.use(express.json())


//Home + React Path
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/client/build/', 'index.html'))
});
async function insert() { 
  const insertResult = await db.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
  console.log('Inserted documents =>', insertResult);
}

//Api Path
app.get('/api/db/', (req,res) =>{
  
  db().get()
});


const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);