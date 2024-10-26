
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

export class UserService  {
    

    register = async (userData) => {
        try {
            console.log('User data received for registration:', userData); // Log incoming data
    
            const { Name, Role, Email, Password } = userData;
            if (!Name || !Role || !Email || !Password) {
                throw new Error('All fields are required.');
            }
    
            console.log('Password before hashing:', Password); // Log the password
    
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(Password, 10);
            const newUser = await User.create({ Name, Role, Email, Password: hashedPassword });
    
            // Remove the password from the returned data for security
            const { Password: _, ...userWithoutPassword } = newUser.toJSON();
            return userWithoutPassword;
        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    };
    

// Login function: validates user credentials and returns a JWT token
login = async (userData) => {
    try {
        // Make sure to use the same casing as the incoming request
        const { Email, Password } = userData;

        // Debugging output
        console.log("Email:", Email);
        console.log("Password:", Password);

        // Find the user by email
        const user = await User.findOne({ where: { Email } });
        if (!user) throw new Error('User not found');

        // Check if the provided password matches the stored hashed password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) throw new Error('Invalid credentials');

        // Generate a JWT token
        const token = jwt.sign({ id: user.userID, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });

        // Remove password from user object before returning
        const { Password: _, ...userWithoutPassword } = user.toJSON();
        return { user: userWithoutPassword, token };
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};




// Logout function: simply returns a confirmation; token handling typically handled on frontend
 logout = async () => {
    try {
        // This could include any backend-specific logout logic, like invalidating sessions.
        // Since JWT tokens are stateless, you could simply inform the frontend to delete the token client-side.
        return { message: 'User logged out successfully' };
    } catch (error) {
        throw new Error('Logout failed: ' + error.message);
    }
};

// Update Profile function: allows the user to update their profile information
updateProfile = async (req, res) => {
    try {
        console.log(req,'req')
        const userId = req.user.id; // Get the user ID from the request object
        console.log(userId,'id')
        const updateFields = req.body; // Get the fields to update from the request body
        console.log(updateFields,'udpate fields')

        const user = await User.findByPk(userId);
        
        if (!user) return res.status(404).json({ error: 'User not found' }); // Return 404 if user not found

        // Update the user's information with the provided fields
        await user.update(updateFields);
        console.log(updateFields,'1111111')

        // Return updated user data, excluding the password
        const { password, ...updatedUser } = user.toJSON();
        return res.status(200).json(updatedUser); 
    } catch (error) {
        return res.status(500).json({ error: 'Profile update failed: ' + error.message }); 
    }
};

}
