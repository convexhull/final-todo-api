const {SHA256} = require('crypto-js');          //One way hash! 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var password = '123abc!';
// bcrypt.genSalt(10 , (err,salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });
// var data = {
//     id : 10
// };

var hashedpassword = '$2a$10$V13AntSBKw7LXj8pn3kXDuefbIl5KKf/1xdKndtpoCyXH68QdJPjm';
bcrypt.compare( '123abc!' , hashedpassword, (err,res) => {
    console.log(res);
});

// var token = jwt.sign(data,'123abc');
// console.log(token);

// var decoded = jwt.verify(token,'123abc');
// console.log('decoded' , decoded);

// var message = 'i am user number 3';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);              
// console.log(`Hash: ${hash}`);

//Using hashing on tokens to verify that they haven't been manipulated ! We just send the tokens and verify their virginity on comeback!!

// var data = {
//     id : 4
// };

// var token = {
//     data , hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash =SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed !!');
// }


