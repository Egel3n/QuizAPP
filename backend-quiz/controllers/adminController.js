const Admin = require("../models/Admin");

const admin_create = (req, res) => {
  const admin = new Admin(req.body);
  admin
    .save()
    .then((result) => {
      res.status(201).json("Admin Created");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { admin_create };
