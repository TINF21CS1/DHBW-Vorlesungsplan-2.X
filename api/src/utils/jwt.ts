import jwt from "jsonwebtoken";

function generateToken(user) {
    return jwt.sign({userId: user.id}, process.env.JWT_ACCESS_SECRET), {
        expiresIn: '10m',
    });
}