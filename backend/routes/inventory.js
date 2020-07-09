

var express = require('express');
// var {uuid} = require('uuidv4')
var router = express.Router();


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
    key: Number,
    description: String,
    amount: Number,
    targetAmount: Number,
    selected: Boolean
}, { versionKey: false });

var Streams = mongoose.model('inventories', streamSchema);

// messagessss = [
// 	{
// 		"key": 0,
// 		"description": "Tomato",
// 		"amount" : 2,
//         "targetAmount": 3,
//         "selected": true
// 	},
// 	{
// 		"key":1,
// 		"description": "Apple",
// 		"amount": 3,
//         "targetAmount": 4,
//         "selected": false

// 	}
//     ]

// Streams.insertMany(messagessss,function(error, docs) {})

router.get('/', function(req, res, next) {
  let users = Streams.find({}).then(
    
    (data) => {
    console.log('Data: ',data)

    res.json(data);}

  ).catch((error) => {console.log('error ', error) })

  // /const foundUser = users.find(user => user.key === req.params.userId)
  // res.setHeader('Content-Type','application/json')
  // res.send(users);

});


// router.get('/:userId', function(req, res, next) {
  
//   let users = Streams.find({}).then(
    
//     (data) => {
//     console.log('Data: ',data)
//     const foundUser = data.find(user => Number(user.key) === Number(req.params.userId))

//     // console.log(foundUser)
//     // console.log(req.params.userId)
//     // console.log(data)

//     res.send(foundUser);}

//   ).catch((error) => {console.log('error ', error) })

//   // const foundUser = users.find(user => user.key === req.params.userId)
//   // res.setHeader('Content-Type','application/json')
//   // res.send(foundUser);
// });


router.post('/', function(req,res,next){
console.log(req.body)

let stream = new Streams(req.body)

stream.save()
res.setHeader('Content-Type','application/json')
res.send(stream);
})



router.delete('/', function(req,res,next){


  mongoose.connection.collections['inventories'].drop( function(err) {
    console.log('collection dropped');
});


  res.setHeader('Content-Type','application/json')
  res.send(stream);
  })



  router.delete('/:key', function(req,res,next){


    mongoose.connection.collections['inventories'].drop( function(err) {
      console.log('collection dropped');
  });
        req.params.userId
  
    res.setHeader('Content-Type','application/json')
    res.send(stream);
    })

module.exports = router;
