import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = "123456";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ error: err });
      }
  };

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await User.findById(id)
  
        if (!user) {
          return res.status(404).json({ message: "Id not found" });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
  }


export const register = async (req, res, next) =>{

    const { username, password,  email } = req.body
    console.log(username, password,  email);
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          email,
          password: hash,

        })
          .then((user) =>{
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, email },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(201).json({
              message: "User successfully created",
              user: user._id,
              token: token,
            });
          })
          .catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
    };


export const login = async (req, res, next)=>{
    const { email, password } = req.body
    // Check if username and password is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
          res.status(401).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
          // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, email },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(201).json({
              message: "User successfully Logged in",
              user: user._id,
              token: token,
            });
          } else {
            res.status(400).json({ message: "Login not succesful" });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (!user) {
        res.status(404).json({ message: "ID not found." });
        return;
      }
      await User.deleteOne({ _id: id });
      res.status(200).json({ message: "Document deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };


  export const logout = (req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({ message: "User successfully logged out" });
  }
