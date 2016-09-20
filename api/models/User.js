/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema : true,
  attributes: {

      name: {
        type:'string',
        required:true,
        minLength: 1,
        maxLength: 20
      },

      title: {
        type:'string'
      },

      email: {
        type:'string',
        email: true,
        required:true
      },

      encryptedPassword: {
        type:'string'
      },
      toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        delete obj.confirm;
        delete obj.encryptedPassword;
        delete obj._csrf;
        return obj;
      },

      beforeCreate: function(values, next) {
        if(!values.password || values.password != values.confirm)
        {
          return next({err: ["password and confirmation don't match"]});
        }

        require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err,encryptedPassword){
          if(err) return next(err);
          values.encryptedPassword = encryptedPassword;
          //values.online= true;
          next();
        });
      }
  }
};
