import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import GitHubStrategy from "passport-github2";

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
            let user = await UserModel.findOne({ email });
            if (user) return done(null, false);

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            return done(null, result);

        } catch (error) {
            return done(error);

        }

    }))


    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {

        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                console.log("este usuario no existe");
                return done(null, false);
            }

            if (!isValidPassword(password, user)) return done(null, false);
            return done(null, user);

        } catch (error) {
            return done(error)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);

    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({ _id: id });
        done(null, user);
    })

    passport.use ("github", new GitHubStrategy({
        clientID: "Iv1.88ce8c3fd1bad606",
        clientSecret: "ddf914dc052097dac945b0ba309d08d2a3c7fa75",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"

    }, async (accessToken, refreshToken, profile, done) => {
        console.log ("peril del usuario", profile);
        try {
            let user = await UserModel.findOne ({email: profile._json.email});

            if (!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "Usuario",
                    age: 33,
                    email: profile._json.email,
                    password: "1234",
                }
                let result = await UserModel.create (newUser);
                done (null, result);
            } else {
                done (null, user);
            }
            
        } catch (error) {
            return done (error);
            
        }

    }))

}


export { initializePassport };