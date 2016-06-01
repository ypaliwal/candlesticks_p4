var express 	= require('express');
var User	 	= require('./models/user');

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// logging
	next();
});

// // test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
	res.json({ message: 'User routes GET request.' });
});


// Post a new user profile - SIGNUP
router.post('/newUser',function(req,res){
	var newUser = new User();

	newUser.name = req.body.name;
	newUser.email = req.body.email;
	newUser.passwordHash = req.body.passwordHash;
	newUser.stockArr = "";

	newUser.save(function(err){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(newUser._id);

			// console.log(res);
		}
	});
});

// LOGIN - Check if right password and email,
//         if so, ...
router.post('/loginCheck', function(req, res) {
	User.find(function(err,objectsArray) {
		if(err) {
			console.log(err);
			res.status(400)
				.json({err:err});
		} else {
			var loginSuccess = false;
			// loop over objectsArray and check if the email exists
			for (var i = 0; i < objectsArray.length; i++) {
				if ((req.body.email == objectsArray[i].email) && (req.body.passwordHash == objectsArray[i].passwordHash))  {
					res.json(objectsArray[i]);
					loginSuccess = true;
				} else if ((req.body.email == objectsArray[i].email) && (req.body.passwordHash != objectsArray[i].passwordHash)) {
					res.json('Incorrect login info');
				}
			}
			if (!loginSuccess) {
				res.json('User not found!');
			}
		}
	});
});


// Get a an array of all objects - Deactivate later
router.get('/allUsers', function(req, res) {
	User.find(function(err,objectsArray) {
		if (err) {
			console.log(err);
			res.status(400)
				.json({err:err});
		} else {
			res.json(objectsArray);
		}
	});
});



// Delete a user
router.delete('/:user_id', function(req, res) {
	User.remove({
		_id: req.params.user_id
	}, function(err, user) {
		if(err) 
			res.send(err);

		res.json({ message: 'Successfully deleted user.' });
	});
});

router.get('/get/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if(err) {
			console.log(err);
		} else {
			res.json(user);
		}
	});
});

router.put('/updateStockArr/:user_id', function(req, res) {
	var __object = req.body;
	var update = {
		stockArr: __object.stockArr
	}

	var query = {"_id":req.params.user_id};

	User.update(query, update, {}, function(err, object) {
		if(err) {
			console.log(err);
			res.status(400)
				.json({err:err});
		} else {
			res.json(object);
		}
	})
})


module.exports = router;









