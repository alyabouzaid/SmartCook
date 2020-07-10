

var express = require('express');

var router = express.Router();

const fetch = require("node-fetch");

const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/ReactReduxExpressMongo')
.then(() =>  console.log('connection succesful2222'))
.catch((err) => console.error(err));

const uri = "mongodb+srv://smartcook_436:SCook-436@smartcook436.sln0r.mongodb.net/dev?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
var Schema = mongoose.Schema;
var streamSchema = new Schema({

    email :String,
    inventory:[{key: Number,
    description: String,
    amount: Number,
    targetAmount: Number,
    selected: Boolean}]
}, { versionKey: false });

var Streams = mongoose.model('inventories', streamSchema);


router.get('/', function(req, res, next) {

    fetch("http://localhost:9000/auth/user", {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
  })  .then((resFetch) => {
      resFetch.json().then((userInfo) => {
          Streams.find({ email: userInfo.email }).then(

          (data) => {
          

          if(data[0] === undefined){

            newUser = [{
              "email" :userInfo.email,
              "inventory":[]}]
            Streams.insertMany(newUser,function(error, docs) {})
            res.json([])
          } else{

          res.json(data[0].inventory);
          }
        }
          
  )}) })  .catch((error) => {console.log('error ', error) })
});



router.post('/', function(req,res,next){
console.log(req.body.email)
console.log(req.body.inventory[0])

Streams.update(
  { email: req.body.email },
  { $push: { inventory: req.body.inventory[0] } }
).catch(err => console.log(err))

res.setHeader('Content-Type','application/json')
res.send({});
})



router.delete('/:email', function(req,res,next){

console.log(req.params.email)

    Streams.update(
      { email: req.params.email },
      { $set: { inventory: [] } }
    ).catch(err => console.log(err))

  res.setHeader('Content-Type','application/json')
  res.send({});
  })



  router.delete('/:email/:key', function(req,res,next){


    console.log(req.params.email)

    Streams.update(
      { email: req.params.email },
      { $pull: { inventory: {key :req.params.key }}} 
    ).catch(err => console.log(err))

  res.setHeader('Content-Type','application/json')
  res.send({});
    })

module.exports = router;
