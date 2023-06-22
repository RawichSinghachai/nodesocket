const { MongoClient,ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET


exports.findAdmin = async () => {
  await client.connect();
  const admin = await client
    .db("database")
    .collection("admin")
    .find({})
    .toArray();
  await client.close();
  return admin;
};

exports.register = async (username, password, email) => {
  await client.connect();
  await client
    .db("database")
    .collection("admin")
    .insertMany([
      {
        _id:new ObjectId('648ddff2c2673a4c95f27135'),
        username: username,
        password: password,
        email: email,
        type: "Admin",
      },
    ]);

  await client.close();
};

exports.login = async (username, password) => {
  await client.connect();
  try {
    const admin = await client
      .db("database")
      .collection("admin")
      .findOne({ $and: [{ username: username }, { password: password }] })
    await client.close();
    const token = jwt.sign({ username: admin.username,email:admin.email,type:admin.type}, secret)
    return {token};

  } catch (error) {
    return {status:'Faild'}
  }
};

exports.auth = async(token) => {
  try {
    const decoded = jwt.verify(token.split(' ')[1], secret);
    return {status:'success',decoded}
   
  } catch (error) {
    return {status:'error'}

  }
}
