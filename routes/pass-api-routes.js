const db = require('../models'); 
const passport = require('../config/passport');

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
 
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({
      // username: req.user.username,
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. 
  app.post('/api/signup', (req, res) => {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, '/api/login');
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side

  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log('yes, userdata');
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
