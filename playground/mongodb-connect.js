const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {

    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').insertOne({
    //     text : 'Something to do ',
    //     completed : false
    // } , (err,res) => {
    //     if(err) {
    //         return console.log('Unable to insert todo: ', err);
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name : 'Yash',
    //     age : 21,
    //     location: 'Katra'
    // } , (err,res) => {
    //     if(err) {
    //         return console.log('Unable to insert data: ', err);
    //     }
    //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,2));
    // });

    db.close();
});