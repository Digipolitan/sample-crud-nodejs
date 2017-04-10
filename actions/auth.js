const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;

    function login(req, res, next) {
        const login = req.body.login;
        const password = sha1(req.body.password);

        User.findOne({
            login: login,
            password: password
        })
            .then(ensureOne)
            .then(generateToken)
            .then(res.prepare(200))
            .catch(res.prepare(404));

        function ensureOne(user) {
            return (user) ? user : Promise.reject();
        }

        function generateToken(user) {
            return new Promise((resolve, reject) => {
                let token = {
                    userId: user._id.toString(),
                };

                jwt.sign(token, api.settings.security.secret, {
                    expiresIn: '1d'
                }, (err, encryptedToken) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(encryptedToken);
                });
            });
        }
    }

    return {
        login
    };
};