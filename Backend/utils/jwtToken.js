const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken(); // Generate token
    const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

    res.status(statusCode).cookie(cookieName, token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site in production, 'lax' otherwise
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // COOKIE_EXPIRE converted to milliseconds
    }).json({
        success: true,
        message,
        user,
        token
    });
};

export default generateToken;
