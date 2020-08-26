const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Category = mongoose.model('Category');

//API for Registration
module.exports.register = (req, res, next) => {
    console.log('Register done!!',req.body);
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err){
            console.log('Saved');
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
//API for Adding Category
module.exports.addCategory = (req, res, next) => {
    console.log('Category Data!!',req.body);
   
    const category = new Category({
        category: req.body.category,
        contentDesc: req.body.contentDesc
      });
      category.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Category saved successfully!",
          userCreated: {
            category: result.category,
            contentDesc: result.contentDesc
          }
        })
      }).catch(err => {
        console.log(err),
          res.status(500).json({
            error: err
          });
      })
}
//API for Login with passport
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {   
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt(),"_id": user._id });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
//API to get category List
module.exports.getCategoryList = (req, res, next) =>{
    console.log('IDD Req');
    Category.find({},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user :user });
        }
    );
}
//API to get user profile
module.exports.userProfile = (req, res, next) =>{
    console.log('IDD Req',req.body);
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['name','email']) });
        }
    );
}