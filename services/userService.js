import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export class UserService {
  ///////////////test data////////////////////
  login = async (userData) => {
    console.log(userData, "111");
    const { Email, Password } = userData;
    try {
      const user = await User.findOne({ where: { Email: Email } });
      console.log(user, "hhh");
      if (!user) {
        return { status: 401, message: "User is not authenticated" };
        // return res.status(401).json({ message: "User is not authenticated" });
      }
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return { status: 401, message: "User is not authenticated" };
        // return res.status(401).json({ message: "User is not authenticated" });
      }
      //generate JWT token
      const token = jwt.sign({ email: user.email, Role: "Admin" }, "1122", {
        expiresIn: "2h",
      });

      return { status: 401, message: "login successfully", token };
      // return res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      console.error("Error during login", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // Register method to add users by superadmin
  register = async (registerData, token) => {
    const verifyToken = token; // Token received from frontend
    console.log("Received Token:", verifyToken);
    console.log("Register Data:", registerData);

    const { Email, Password } = registerData;

    try {
      // Check if the token is provided
      if (!verifyToken) {
        return { status: 403, message: "Access denied: No token provided" };
      }

      // Step 1: Verify the JWT token
      let decodedToken;
      try {
        decodedToken = jwt.verify(verifyToken, "1122"); // secret key used during token creation
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Token verification failed:", error.message);
        return { status: 403, message: "Access denied: Invalid token" };
      }

      // Step 2: Find the superadmin user from the database
      const isSuperAdmin = await User.findOne({
        where: { Role: "Admin" }, // Assuming "Admin" is the role for superadmin
      });
      console.log(isSuperAdmin, "tttt");

      if (!isSuperAdmin) {
        console.log("Superadmin not found");
        return { status: 401, message: "Superadmin not found" };
      }

      // Step 3: Check if the token's email matches the superadmin's email
      if (decodedToken.Role !== "Admin") {
        console.log("Access denied: Not a superadmin");
        return {
          status: 403,
          message: "Access denied: User is not superadmin",
        };
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      // Step 5: Register the new user in the database
      await User.create({ Email, Password: hashedPassword });

      console.log("User registered successfully");
      return { status: 200, message: "User registration successful" };
    } catch (error) {
      console.error("Error during registration:", error.message);
      return { status: 500, message: "Server error" };
    }
  };

  registeredUsers = async (userData) => {
    let list = await User.findAll();
    return list;
  };
}

// Step 4: Hash the password for the new user

/////////////////////////////////////////
// register = async (req) => {
//   console.log(req, "rr");
//   //////////////////////// test data
//   const { email, password } = req.body;
//   try {
//     // Find the superadmin user in the database
//     const isSuperAdmin = await User.findOne({
//       where: { Role: "Admin", email: email },
//     });

//     console.log(isSuperAdmin, "iii");
//     if (!isSuperAdmin) {
//       return res.status(401).json({ message: "Superadmin not found" });
//     }

//     // Check if the superadmin is authenticated (based on the JWT token)
//     const token =
//       req.headers.authorization && req.headers.authorization.split(" ")[1];

//     //console.log(token);
//     if (!token) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     // console.log(token);
//     // Verify the JWT token
//     const decodedToken = jwt.verify(token, "1122");
//     if (decodedToken.email !== isSuperAdmin.email) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 2);
//     console.log(hashedPassword);

//     // Create the new user in the database
//     await users.create({ email, password: hashedPassword });
//     //await newUser.update({ Registered_Users: email });
//     console.log(users);
//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during user registration", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Login function: validates user credentials and returns a JWT token
// login = async (userData) => {
//   try {
//     // Make sure to use the same casing as the incoming request
//     const { Email, Password } = userData;

//     // Debugging output
//     console.log("Email:", Email);
//     console.log("Password:", Password);

//     // Find the user by email
//     const user = await User.findOne({ where: { Email } });
//     if (!user) throw new Error("User not found");

//     // Check if the provided password matches the stored hashed password
//     const isMatch = await bcrypt.compare(Password, user.Password);
//     if (!isMatch) throw new Error("Invalid credentials");

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user.userID, email: user.Email },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Remove password from user object before returning
//     const { Password: _, ...userWithoutPassword } = user.toJSON();
//     return { user: userWithoutPassword, token };
//   } catch (error) {
//     throw new Error("Login failed: " + error.message);
//   }
// };

// Update Profile function: allows the user to update their profile information
// updateProfile = async (req, res) => {
//   try {
//     console.log(req, "req");
//     const userId = req.user.id; // Get the user ID from the request object
//     console.log(userId, "id");
//     const updateFields = req.body; // Get the fields to update from the request body
//     console.log(updateFields, "udpate fields");

//     const user = await User.findByPk(userId);

//     if (!user) return res.status(404).json({ error: "User not found" }); // Return 404 if user not found

//     // Update the user's information with the provided fields
//     await user.update(updateFields);
//     console.log(updateFields, "1111111");

//     // Return updated user data, excluding the password
//     const { password, ...updatedUser } = user.toJSON();
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Profile update failed: " + error.message });
//   }
// };
