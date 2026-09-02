const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2m" });
    return accessToken;
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
    return refreshToken;
}

const generateNewAccessToken = (token) => {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log(payload);
    const { name, email } = payload;
    const user = {
        name,
        email
    };
    const newAccessToken = generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET);
    console.log(newAccessToken);
    return newAccessToken;
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateNewAccessToken
}

