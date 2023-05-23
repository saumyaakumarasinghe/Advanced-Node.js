const db = require('../server');

const read = async (req, res) => {
    try {
        const query = `SELECT * FROM students`;
        const data = await db.query(query);
        
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    read
}