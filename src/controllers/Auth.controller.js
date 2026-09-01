const ErrorResponse = require("../utils/ErrorResponse");
const UserSchema = require("../schema/userSchema");
const passport = require("../components/Passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


class AuthController {
    async HomePath(req, res) {
        try {
            const {email, googleId, name, ProfilePicture} = req.user;
            console.log(email, googleId, name, ProfilePicture);
            if (!email || !googleId || !name) {
                throw new ErrorResponse(404, "User not found");
            }
            const encryptedPass = bcrypt.hashSync(googleId, 10);
            console.log(encryptedPass);
            const EnlistNewUser = new UserSchema({
                name: name,
                email: email,
                ProfilePicture: ProfilePicture,
                password: encryptedPass
            });
            const savedUser = await EnlistNewUser.save();
            res.json({
                success: true,
                user: savedUser,
                message: "login successfull"
            });
        } catch (error) {
            console.log(error);
            throw new ErrorResponse(404, error.message);
        }
    }
}

module.exports = new AuthController();

