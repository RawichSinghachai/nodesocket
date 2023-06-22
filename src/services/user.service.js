const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

exports.findAll = async () => {
  await client.connect();
  const users = await client
    .db("database")
    .collection("user")
    .find({})
    .toArray();
  await client.close();
  return users;
};

//New
exports.findOne = async (id) => {
  await client.connect();
  const user = await client
    .db("database")
    .collection("user")
    .findOne({ _id: new ObjectId(id) });
  await client.close();
  return user;
};

//Edit
exports.register = async (
  firstname,
  lastname,
  username,
  password,
  phone,
  email,
  age,
  school
) => {
  await client.connect();
  await client
    .db("database")
    .collection("user")
    .insertMany([
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        phone: phone,
        email: email,
        age: age,
        school: school,
        type: "Student",
        course: null,
        date: new Date(),
      },
    ]);
  await client.close();
  return { data: "ok" };
};

//Edit
exports.login = async (username, password) => {
  try {
    await client.connect();
    const user = await client
      .db("database")
      .collection("user")
      .findOne({ $and: [{ username: username, password: password }] });
    await client.close();
    const token = jwt.sign(
      {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        age: user.age,
        school: user.school,
        course: user.course,
        type: user.type,
        date: user.date,
      },
      secret
    );
    return { status: "correct", token };
  } catch (error) {
    return { status: "incorrect" };
  }
};

exports.auth = async (token) => {
  try {
    const decoded = jwt.verify(token.split(" ")[1], secret);
    return { status: "success", decoded };
  } catch (error) {
    return { status: "error" };
  }
};

exports.update = async () => {
  await client.connect();
  await client
    .db("database")
    .collection("user")
    .updateOne(
      { username: "Jame" },
      { $set: { username: "Black", course: "pat1" } }
    );
  await client.close();
};

//Creating
exports.uploadImage = async (id,title,image) => {
  //_id : userID
  //album :[{topic , image }]
  await client.connect();
  await client
    .db("database")
    .collection("UserImage")
    .insertMany([
      { 
        _id: new ObjectId(id),
        title:title,
        image:image
      }
    ]
  );
};
