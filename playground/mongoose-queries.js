const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');
// var id = "6bf1be156f5ed72447f6448411";

var id = "5bf09211bcf5c7c56492deac";

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id : id
// }).then( (todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id : id
// }).then( (todo) => {
//     console.log('Todo: ', todo);
// });

// Todo.findById(id).then( (todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by id: ' ,todo);
// });

User.findById(id).then( (user) => {
    if(!user) {
        return console.log('ID not found');
    }
    console.log(JSON.stringify(user,undefined,2));
}).catch( (e) => {
    console.log(e);
})