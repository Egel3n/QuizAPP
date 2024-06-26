const User = require("../models/Student");
const Teacher = require("../models/Teacher");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // incorrect email
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.username = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

// // controller actions
// module.exports.signup_get = (req, res) => {
//   //res.render("signup");
// };

// module.exports.login_get = (req, res) => {
//   //res.render("login");
// };

module.exports.signup_post = async (req, res) => {
  if (req.body.role == "student") {
    const { username, password, teacherID, name } = req.body;

    try {
      const user = await User.create({ username, password, teacherID, name });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else {
    const { username, password, name } = req.body;

    try {
      const user = await Teacher.create({
        username,
        password,
        name,
      });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  const cookieOptions = {
    httpOnly: false,
    maxAge: maxAge * 1000,
    sameSite: "none",
    secure: "false",
  };
  if (await Teacher.exists({ username: username })) {
    try {
      const user = await Teacher.login(username, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.cookie("userID", user._id, {
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.cookie("name", user.name, { httpOnly: false, maxAge: maxAge * 1000 });
      res.cookie("role", "teacher", { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({
        user: user._id,
        username: user.username,
        role: "teacher",
        accessToken: token,
      });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else if (await User.exists({ username: username })) {
    try {
      console.log("Ögrenci girdi");
      const user = await User.login(username, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.cookie("userID", user._id, {
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.cookie("name", user.name, { httpOnly: false, maxAge: maxAge * 1000 });
      res.cookie("role", "student", { httpOnly: false, maxAge: maxAge * 1000 });

      res.status(200).json({
        user: user._id,
        username: user.username,
        role: "student",
        accessToken: token,
      });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else if (await Admin.exists({ username: username })) {
    try {
      console.log("Admin girdi");
      const user = await Admin.login(username, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.cookie("userID", user._id, {
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.cookie("name", user.name, { httpOnly: false, maxAge: maxAge * 1000 });
      res.cookie("role", "admin", { httpOnly: false, maxAge: maxAge * 1000 });

      res.status(200).json({
        user: user._id,
        username: user.username,
        role: "admin",
        accessToken: token,
      });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else {
    res.status(400).json();
  }
};

module.exports.logout_get = (req, res) => {
  const cookieOptions = {
    maxAge: 1,
    sameSite: "none",
    secure: "false",
  };
  res.cookie("jwt", "", cookieOptions);
  res.cookie("role", "", cookieOptions);
  res.cookie("name", "", cookieOptions);
  res.cookie("userID", "", cookieOptions);
  res.status(200).send("LoggedOut");
};
