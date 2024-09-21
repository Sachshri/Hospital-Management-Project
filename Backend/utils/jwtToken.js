const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken(); // Generate token
    const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

    res.status(statusCode).cookie(cookieName, token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }).json({
        success: true,
        message,
        user,
        token
    });
};

export default generateToken;
