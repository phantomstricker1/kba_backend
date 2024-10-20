const authenticateToken = require('./jwtAuth');

const authorizeRole = (roles) => {
    return (req, res, next) => {
        
        authenticateToken(req, res, () => {

            if (roles.includes(req.user.role)) {
                next(); // User has access
            } else {
                return res.status(403).json({ message: "You do not have access" }); // Forbidden if user role is not allowed
            }
        });
    };
};

module.exports = authorizeRole;
