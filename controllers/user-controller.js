import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../model/user";

dotenv.config();

// 1.fetch all users
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

// 2.add a user
export const addUser = async (req, res, next) => {
  const { name, password } = req.body;

  //   invalid input in the frontend
  if (!name || !password) {
    return res.send(400).json({ message: "name and password are required." });
  }

  //   check for existing users on the DB
  let existingUser;
  try {
    existingUser = await User.findOne({ name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  if (existingUser) {
    return res.status(403).json({ message: "user already exist" });
  }

  //  add a new user to the db
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    roles: { User: 2001 },
    password: hashedPassword,
  });
  try {
    await newUser.save();
    console.log(newUser);
    return res
      .status(201)
      .json({ message: `${name} was successfully registered` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 3. loginUser with refresh token added on login
export const loginUser = async (req, res, next) => {
  const { name, password } = req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ name });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (!foundUser) {
    return res.status(404).json({ message: "user not found" });
  }

  //   check if user inputed the right password
  const pwdMatch = await bcrypt.compare(password, foundUser.password);

  // at this point the password match so you issue JWT to the user.
  if (pwdMatch) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    //create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: foundUser.name,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" },
    );

    const refreshToken = jwt.sign(
      { username: foundUser.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );
    // save the user object with the refresh token there

    const loginResult = await User.findOneAndUpdate(
      { name },
      { refreshToken: refreshToken },
    );

    console.log(loginResult);

    // secure  the response to the frontend in a sequre HTTPONLY cookie

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "Login SuccessFul", data: { roles, accessToken } });
  }
  return res.status(401).json({ message: "Incorrect Password" });
};
