const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateGenre(user) {
  //const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";
  //const pattern = "/(?=.*[a-z])/";
  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})");
  //confuse with the pattern? read here : https://www.youtube.com/watch?v=FZ7kV3ZzD38
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(255).regex(RegExp(mediumRegex)).required().error( (ex) => {
      return{
        message: 'The password should be contain atleat 1 lower and uppercase alphabetical character, 1  numeric character, 1 special  and 5 character long!'
      }
    } )
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateGenre;