import {User} from "../lib/types/user";

const jwt = require('jsonwebtoken');

export async function generateToken(user: User, jti: string) {
    return jwt.sign({
        jti: jti,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
}

