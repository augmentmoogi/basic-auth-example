const express = require('express');

const passport = require('passport');
const config = require('./config');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = config;

const app = express();

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));


// app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
app.get('/auth/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res) => {
        // Generate JWT token upon successful authentication
        const token = generateJWTToken(req.user);
        res.json({ token });
    }
);


app.get('/', (req, res) => {
    res.send(`<a href="/login">Login</a>`);
});

app.get('/login', passport.authenticate('github'))


app.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login-error', session: false}),
  function(req, res) {
    console.log('this is user', req.user);
    // Successful authentication, redirect home.
    res.redirect('/homepage');
  })


app.get('/homepage', (req, res) => {
  res.send(`<a href="/logout">Logout</a>`);
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


