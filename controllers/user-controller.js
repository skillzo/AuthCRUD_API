import bcrypt from "bcrypt";
import User from "../model/user";

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

// 3. loginUser
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
  if (pwdMatch) {
    return res.status(200).json({ message: "Login SuccessFul" });
  }
  return res.status(401).json({ message: "Incorrect Password" });
};
