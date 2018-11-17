const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {

    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').deleteMany({text : 'Eat lunch'}).then( (res) => {
    //     console.log(res);
    // } , (err) => {
    //     console.log('Some error occurred: ',err);
    // });

    // db.collection('Todos').deleteOne({text : 'Eat lunch'}).then( (res) => {
    //     console.log(res);
    // } , (e) => {
    //     console.log('Error occurred: ',e);
    // });

    // db.collection('Todos').findOneAndDelete({completed : false}).then( (res) => {
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({name : 'Yash'}).then( (res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndDelete({_id : new ObjectID("5bf0695d65c8dd4d89bd4b01") }).then( (res)=> {
        console.log(res);
    });

    //db.close();
});