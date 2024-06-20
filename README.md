

```js
const express = require('express');

const passport = require('passport');
const config = require('./config');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = config;

const app = express();

const OAuth2Strategy = require('passport-oauth2');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {
      accessToken,
      refreshToken,
      profile
    });
  }
));



app.get('/', (req, res) => {
    res.send(`<a href="/login">Login</a>`);
});

app.get('/login', passport.authenticate('oauth2'))


app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login-error', session: false}),
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

```