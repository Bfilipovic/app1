/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	nvideo: function (req,res){

  res.view();
  },

	add: function  (req, res) {
		console.log('begin');
    req.file('vid').upload(function (err, files) {
      if (err)
        return res.serverError(err);
				console.log('end');
      return;
    });
  },

	make: function (req, res, next) {
		Video.create(req.params.all(), function videoCreated (err,video) {
			console.log("create video");
			//	if(err) return next(err);
			req.file('vid').upload({
				dirname: './assets/images'
			}, function (err, uploadedFiles) {
				if (err) return res.negotiate(err);

				return res.json({
					message: uploadedFiles.length + ' file(s) uploaded successfully!'
				});
			});

		if(err){
			console.log(err);
			req.session.flash = {
				err: err
			}
			console.log("all good in da hood");
			return res.redirect('/user/new');
		}

	});
}


};
