const express = require('express');
const cors = require('cors');
const {json} = require('body-parser')
const r = require('rethinkdb')
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


///////// MONGODB
let db;
const url = `mongodb://${process.env.mongodbuser}:${process.env.mongodbpw}@${process.env.serverip}:${process.env.mongodbport}`
const client = new MongoClient(url,  { useNewUrlParser: true }, (err, db) =>{
    if (err) throw err;
})

client.connect((err) => {
    db = client.db('interactiveClassroom');
    console.log('Connected to Mongodb')
},)


// setTimeout(() => {
    // db.collection('test').find({}).toArray((err, docs) => {
    //     assert.equal(err, null);
    //     console.log('found some docs...');
    //     console.log(docs)
    //     client.close()
    // })
// }, 3000)


///////// RETHINK
let connection = null;
r.connect( {
    host: 'localhost',
    port: 28015,
    db: 'interactiveClassroom',
    // host: `${process.env.serverip}`, 
    // port: `${process.env.rethinkdbport}`, 
    // db: 'cityWars',
    // user: `${process.env.rethinkdbuser}`, password: `${process.env.rethinkdbpw}`
  }, function(err, conn) {
  if (err) console.log('error in connection: ', err)
  connection = conn;
    app.set('conn', conn)
    app.set('r', r)

   conn.host ? console.log('Connection complete on: ', conn.host) : console.log('Failed connection')
    // TODO: delete this below
})


setTimeout(() => {
    r.table('room_numbers').run(connection, (err, data) => {
        // console.log(data)
        if(data) data.toArray((err, docs) => {
            console.log(docs)
            const newDocs = docs.map((el)=> {
                delete el.id
                return el
        })
        console.log(newDocs)
        // db.collection('room_numbers').insertMany(newDocs)
    })

    })
}, 3000)




const app = express();
app.use(cors());


app.listen(3088, ()=> console.log("listening on port 3088"))