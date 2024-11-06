import { UserModel } from "../models/user";

const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcryptjs");

export = function (passport: any) {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "emailOrUsername" },
      (email: string, password: string, done: any) => {
        // Match user
        UserModel.findOne({
          email: email,
        }).then((user: any) => {
          if (!user) {
            return done(null, false, {
              message: "The email is not registered",
            });
          }

          // Match password
          bcrypt.compare(password, user.password, (err: any, isMatch: any) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        });
      }
    )
  );

  passport.use(
    new BearerStrategy(function (token: string, done: any) {
      UserModel.findOne({ token: token }, function (err: any, user: any) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: "all" });
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVERDOMAIN}/api/v1/user/auth/google/callback`,
        passReqToCallback: true,
      },
      async function (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        let user = await UserModel.findOne({ email: profile.email });
        if (!user) {
          UserModel.create(
            {
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              isVerified: true,
            },
            function (err: any, user: any) {
              if (err) done(err);
              return done(null, user);
            }
          );
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id: any, done: any) {
    UserModel.findById(id, function (err: any, user: any) {
      done(err, user);
    });
  });
};

// export = {}
