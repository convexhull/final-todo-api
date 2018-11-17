const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {

    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectID('5bf0748a8185c889047e8f94')
    // } , {
    //     $set : {
    //         completed : true
    //     }
    // }, {
    //     returnOriginal : false
    // }).then( (result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate( {
        name : 'Harsh'
    } , {
        $set : {
            name : 'Yash'
        },
        $inc : {
            age : 1
        }
    } , {
        returnOriginal : false
    }).then( (res) => {
        console.log(res);
    });

    //db.close();
});