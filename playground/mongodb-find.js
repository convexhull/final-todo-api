const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {

    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').find({ _id : new ObjectID("5bf067b53dd39f4ceb3f2396") } ).toArray().then( (docs) => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs,undefined,2));
    // } , (err) => {
    //     console.log('Unable to fetch todos: ',err);
    // });
  
    // db.collection('Todos').find().count().then( (count) => {
    //     console.log('Todos count: ',count);
    // } , (err) => {
    //     console.log('Unable to fetch todos: ',err);
    // });

    db.collection('Users').find({name : 'Yash'}).toArray().then( (docs) => {
        console.log('Todos: ');
        console.log(JSON.stringify(docs,undefined,2));
    } , (err) => {
        console.log('Some error happened ', err) ;
    });   
});