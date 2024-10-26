import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is defined somewhere

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header
    console.log(token)

    if (!token) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user; // Attach user information to request
        console.log(user,'userrr')
        next(); // Proceed to the next middleware/route
    });
};

export default authenticateToken; 
