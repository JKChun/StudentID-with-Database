const express = require('express')
const app = express()
const fs = require('fs')
const port = 11002

app.listen(port)
app.use(express.static(__dirname + '/public'))

//const config = require('../mongo-express/config.js')
const mongoose = require('mongoose')

const url = 'mongodb://wp2018_groupC:dadb@localhost/wp2018_groupC'

const conn = mongoose.connect(url, {  useNewUrlParser: true,
                                      autoReconnect: true}, (err, res) => {
  if (err) console.log('fail to connect', err)
});
mongoose.Promise = global.Promise


//student schema
const studentCollectionName = 'students'
const studentSchema = new mongoose.Schema({
  id: String,
  name: String
}, { collection: studentCollectionName });
const studentModel = mongoose.model(studentCollectionName, studentSchema);

//list
app.get('/list_id', function(req, res) {
  var students = "";
  studentModel.find().exec((err, result) => {
    if (err) console.log('fail to list:', err)
    else {
      result.forEach(function(elem){
         students += `${elem.id} : ${elem.name}<br>`
      });
      res.send(students);
    }
  })
});

//search
app.get('/search', function(req, res) {
  studentModel.findOne({ id: req.query.id} ).exec((err, result) => {
    if (err) console.log('fail to query:', err)
    else if (result){
      console.log(result)
      res.send("Hello, " + result.name);
    }
    else{
      res.send("No such student.")
    }
  })
});

//insert
app.get('/ajax_data', function(req, res) { 
  var student; 
  student = new studentModel({ id: req.query.id, name: req.query.name });
  student.save(function (err){
    if (err) console.log("Cannot save STUDENT FUCK!")
  });
	console.log(student + 'added');
})

//delete
app.get('/delete', function(req, res) {
  studentModel.deleteOne({ id: req.query.id }, function (err) {
    if (err) console.log(err);
    else {
      console.log(`${req.query.id} deleted`)
    }
  });
})

