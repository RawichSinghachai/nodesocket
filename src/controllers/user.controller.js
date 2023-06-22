const userService = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
  res.json(await userService.findAll());
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  res.json(await userService.findOne(id));
};

exports.registerUser = async (req, res) => {
  const { firstname, lastname, username, password, phone, email, age, school } =
    req.body;
  res
    .status(200)
    .json(
      userService.register(
        firstname,
        lastname,
        username,
        password,
        phone,
        email,
        age,
        school
      )
    );
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  res.json(await userService.login(username, password));
};

exports.authUser = async (req, res) => {
  const token = req.headers.authorization;
  res.json(await userService.auth(token));
};

exports.updateUser = async (req, res) => {
  userService.update();
  console.log("updata");
};
