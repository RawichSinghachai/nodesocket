const adminService = require("../services/admin.service");


exports.getAdmin = async (req, res) => {
  res.json(await adminService.findAdmin());
};

exports.registerAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  await adminService.register(username, password, email);
  res.status(201).send("Send data is ok");
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  res.json(await adminService.login(username, password))
};

exports.authAdmin = async (req, res) => {
  const token = req.headers.authorization
    res.json(await adminService.auth(token));
};
