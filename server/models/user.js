var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : '{VALUE} is not a valid email.'
        } 
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    tokens : [{             //MongoDB Syntax for nested documents validation !  
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function() {              //UserSchema.method is an object, attached methods to it are instance methods
    
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString() , access } , 'abc123').toString();                  //move later to config var
    user.tokens = [...user.tokens , {access,token}];           // unshift also works. Not push or concat ! Weird!! MongoDB issues
    return user.save().then( () => {
        return token;                                          // We can return value(and not promise) to chain. In that case 
    });                                                        // the success case of the then call takes that returned value. 
};

var User = mongoose.model('User',UserSchema);

module.exports = {User};