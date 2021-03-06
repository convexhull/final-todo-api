var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

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

UserSchema.methods.removeToken = function(token)    {
    var user = this;
    return user.update({                                        // doc.update() family of functions in mongodbnative !!!
        $pull : {
            tokens : {token}
        }
    });
};

UserSchema.statics.findByToken = function(token) {                  // statics is obj, attached func are model methods
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token,'abc123');
    } catch (e) {
        // return new Promise( (resolve,reject) => {                //Reject(e) -> the catch(e) is called using this e
        //     reject();                                            //Returning Promise                                                            //called hard, born easy
        // });
        return Promise.reject();
    }   
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({email}).then( (user) => {
        if(!user){
            return Promise.reject();
        }
        return new Promise( (resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        }); 
    });
};

UserSchema.pre( 'save' , function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash( user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User',UserSchema);

module.exports = {User};