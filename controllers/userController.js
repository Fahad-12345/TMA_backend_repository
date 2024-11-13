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

  getusersList = async (req, res) => {
    try {
      const result = await this.userService.registeredUsers(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).Json({ error: "Error getting registered Users" });
    }
  };
}
