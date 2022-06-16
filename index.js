const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv').config()
const {  getDB, postDB,deleteDB, updateDB } = require('./models/CRUD');

app.use(express.static(path.join(__dirname, "/client/build/")));
app.use(express.json())


//Home + React Path
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/client/build/', 'index.html'))
});


//Api Get
app.get('/api/', (req,res) =>{
getDB().then(data => {
 res.json(data)

  }).catch(err => {
    console.log(err)
  }
  )
});

//Api Post
app.post('/api/', (req,res) =>{
  postDB(`${Date.now()}`)
  .then(data => {
    res.json(`Se cargo con el id: ${data.insertedId}`)
    })
    .catch(err => {
        console.log(err)
      }
      )
  }
);

//Api Delete
app.delete('/api/', (req,res) =>{
  deleteDB(req.query.id)
  .then(data => {
    res.json(data)
    })
    .catch(err => {
        console.log(err)
      }
      )
  }
);

//Api Update
app.put('/api/', (req,res) =>{
  console.log(req.query.id, req.query.date)
  updateDB(req.query.id, req.query.date)
  .then(data => {
    res.json({"Before": data.value, "After": req.query})
    })
    .catch(err => {
        console.log(err)
      }
      )
  }
);




const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);