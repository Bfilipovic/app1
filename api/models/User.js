/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var bcrypt = require('bcrypt-nodejs');


module.exports = {
  schema : true,
  attributes: {

      name: {
        type:'string',
        required:true,
        minLength: 1,
        maxLength: 20
      },

      userName: {
        type:'string',
        required:true,
        minLength: 1,
        maxLength: 20
      },

      gender: {
        type:'string', enum: ['male', 'female', 'other']
      },

      age: {
        type:'string'
      },

      email: {
        type:'string',
        email: true,
        required:true
      },

      isAdmin: {
        type: 'boolean',
        defaultsTo: false
      }

      encryptedPassword: {
        type:'string'
      },
      toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        delete obj.confirm;
        delete  obj.encryptedPassword;
        delete obj._csrf;
        return obj;
      }
  },

  beforeCreate : function(user, next) {
    console.log('beforeCreate');
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if(err)
          console.log(err);
        else
          user.encryptedPassword = hash;
        next();
    })
  });
}

};
