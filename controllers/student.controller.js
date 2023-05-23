const read = (req, res)=> {
    try {
        res.status(200).json({
            message: `hello world!`
        });
    } catch {
        res.sendStatus(500);
    }
}

module.exports = {
    read
}