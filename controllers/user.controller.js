const db = require('../models/index');
const bcrypt = require('bcrypt');
const modelName = 'user';

const signup = async (req, res) => {
    try {
        let { password } = req.body;

        if (password) {
            // const salt = await bcrypt.genSalt();  // Salt default 10
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
        }

        await db[modelName].create(req.body);
        
        res.status(200).json({
            message: `User created successfully`
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const login = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await db[modelName].findOne({
            raw: true,
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).send(`Cannot find the user!`);
        }

        // If the passowrd is the same
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('success!')
        } else {
            res.send('not allowed!')
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getAll = async (req, res) => {
    try {
        const query = `SELECT * FROM users`;
        const data = await db.sequelize.query(query,{
            type: db.sequelize.QueryTypes.SELECT
        });
        
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    signup,
    login,    
    getAll
}