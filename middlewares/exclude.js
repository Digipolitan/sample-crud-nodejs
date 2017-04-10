module.exports = (fields) => {
    fields = (fields instanceof Array) ? fields : [fields];

    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).send();
        }

        for (let field of fields) {
            if (req.body[field]) {
                delete req.body[field];
            }
        }

        next();
    }
};