const ErrorResponse = require("../utils/ErrorResponse");
const UserSchema = require("../schema/userSchema");
const passport = require("../components/Passport");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken, generateNewAccessToken } = require("../utils/token");


class AuthController {
    async GoogleSignIn(req, res) {
        try {
            const { email, name, picture, sub } = req.user;
            if (!email || !name) {
                throw new ErrorResponse(404, "User not found");
            };
            const exsistingUser = await UserSchema.findOne({ email: email });
            console.log(exsistingUser);
            if (exsistingUser) {
                const accessToken = generateAccessToken({ name: name, email: email });
                const refreshToken = generateRefreshToken({ name: name, email: email });

                if (!accessToken || !refreshToken) {
                    throw new ErrorResponse(404, "Token generation failed");
                }

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                });

                res.json({
                    success: true,
                    user: exsistingUser,
                    accessToken: accessToken,
                    message: "login successfull"
                });
            }
            const encryptedPass = bcrypt.hashSync(sub, 10);
            const EnlistNewUser = new UserSchema({
                name: name,
                email: email,
                ProfilePicture: picture,
                password: encryptedPass
            });
            const savedUser = await EnlistNewUser.save();
            const accessToken = generateAccessToken({ name: name, email: email });
            const refreshToken = generateRefreshToken({ name: name, email: email });
            if (!accessToken || !refreshToken) {
                throw new ErrorResponse(404, "Token generation failed");
            }
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });
            res.json({
                success: true,
                user: savedUser,
                accessToken: accessToken,
                message: "login successfull"
            });
        } catch (error) {
            throw new ErrorResponse(404, error.message);
        }
    }

    async signUp(req, res) {
        const { email, password, name } = req.body;
        console.log(email, password);
        if (!email || !password || !name) {
            throw new ErrorResponse(404, "Invalids Field Entry");
        }

        const existingUser = await UserSchema.findOne({ email: email });

        if (existingUser) {
            throw new ErrorResponse(404, "There is already one user with the same email, try signin");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        if (!encryptedPassword) {
            throw new ErrorResponse(404, "Something Went Wrong");
        }

        const newUser = new UserSchema({
            email: email,
            password: encryptedPassword,
            name: name,
        });

        const accessToken = generateAccessToken({ name: name, email: email });
        const refreshToken = generateRefreshToken({ name: name, email: email });

        if (!accessToken || !refreshToken) {
            throw new ErrorResponse(404, "Invalid Token Generation");
        }

        const saveNewUser = await newUser.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secret: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            success: true,
            data: saveNewUser,
            accessToken: accessToken,
        });
    }

    async signIn(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ErrorResponse(404, "Email or password is not defined");
        }
        const exsistingUser = await UserSchema.findOne({ email: email });
        if (!exsistingUser) {
            throw new ErrorResponse(404, "Email is not registered, Kindly Sign Up First");
        }
        const decode = await bcrypt.compare(password, exsistingUser.password);
        if (!decode) {
            throw new ErrorResponse(404, "Invalid Password");
        }
        const accessToken = generateAccessToken({ name: exsistingUser.name, email: exsistingUser.email });
        const refreshToken = generateRefreshToken({ name: exsistingUser.name, email: exsistingUser.email });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        res.json({
            success: true,
            data: exsistingUser,
            accessToken: accessToken,
        });
    }

    async tokenRefresh(req, res) {
        console.log(req.cookies);
        const { refreshToken } = req.cookies;
        console.log(refreshToken);
        if (!refreshToken) {
            throw new ErrorResponse(404, "RefreshToken is invalid, try login in again");
        }
        const token = await generateNewAccessToken(refreshToken);
        res.json({
            success: true,
            accessToken: token,
        });
    }

    async forgetPassword(req, res) {
        
    }

    async setProfilePicture(req, res) {

    }
}

module.exports = new AuthController();

