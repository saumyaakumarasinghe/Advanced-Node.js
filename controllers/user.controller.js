require("dotenv").config();

const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const modelName = "user";

const signup = async (req, res) => {
  try {
    let { email, password } = req.body;

    const emailExists = await db[modelName].findOne({
      where: {
        email,
      },
    });

    if (emailExists) {
      return res.status(409).json({
        message: `Email already exists!`,
      });
    }

    if (password) {
      // const salt = await bcrypt.genSalt();  // Salt default 10
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }

    await db[modelName].create(req.body);

    res.status(200).json({
      message: `User created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db[modelName].findOne({
      raw: true,
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).send(`Cannot find the user!`);
    }

    const successUser = await bcrypt.compare(req.body.password, user.password);

    delete user.password;

    if (successUser) {
      const token = jwt.sign(
        {
          user,
          expireIn: "24h",
        },
        "advancedNode"
      );
      user.token = token;
      res.status(200).json(user);
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAll = async (req, res) => {
  try {
    // const query = `SELECT * FROM users`;
    // const data = await db.sequelize.query(query,{
    //     type: db.sequelize.QueryTypes.SELECT
    // });

    const data = await db[modelName].findAll();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  signup,
  login,
  getAll,
};
