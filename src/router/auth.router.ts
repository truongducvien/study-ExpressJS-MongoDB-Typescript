import { envConfig } from '@/config';
import {
  handleGoogleRedirect,
  logIn,
  register,
  verifyAccount,
  verifyRedirectToken
} from '@/controllers/auth.controller';
import { UserGoogleResponse } from '@/types';
import * as express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const authRouter = express.Router();

authRouter.post('/sign-up', register);

authRouter.post('/sign-in', logIn);

authRouter.get('/verify/:userId', verifyAccount);

// Google Auth:
passport.use(
  new GoogleStrategy(
    {
      clientID: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CIENT_SECRET,
      callbackURL: `${envConfig.PUBLIC_API_URL}/api/auth/google/callback`
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user as UserGoogleResponse);
});

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${envConfig.PUBLIC_FE_URL}/pages/login.html`
  }),
  handleGoogleRedirect
);

authRouter.post('/redirect/verify', verifyRedirectToken);

export default authRouter;
