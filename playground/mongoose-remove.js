const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then( (result) => {
//     console.log(result);
// });


// Todo.findOneAndRemove()


Todo.findByIdAndRemove('5bf2eadf841d14a71318a8dc').then( (todo) => {
    console.log(todo);
});