import { UserService } from "../services/userService.js";
import User from "../models/User.js";
export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req, res) => {
    console.log(req.body, "fff");
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
      const result = await this.userService.register(req.body, token);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const result = await this.userService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      const result = await this.userService.logout(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Access user ID from req.user set by middleware
      const updateFields = req.body;

      const user = await User.findByPk(userId);
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.update(updateFields);
      const { password, ...updatedUser } = user.toJSON();
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Profile update failed: " + error.message });
    }
  };
}
