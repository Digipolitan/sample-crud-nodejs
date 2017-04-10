const sha1 = require('sha1');

module.exports = (api) => {
    const User = api.models.User;

    function create(req, res, next) {
        let user = new User(req.body);
        user.password = sha1(user.password);

        return ensureEmailDoesNotExist()
            .then(save)
            .then(res.prepare(201))
            .catch(res.error);

        function ensureEmailDoesNotExist() {
            return User.findOne({
                email: req.body.email
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (!data) ? undefined : Promise.reject({code: 403, reason: 'login.already.exists'});
            }
        }

        function save() {
            return user.save();
        }
    }

    function list(req, res, next) {
        User.find()
            .then(res.prepare(200))
            .catch(res.error);
    }

    function show(req, res, next) {
        User.findById(req.params.id)
            .then(ensureOne)
            .then(res.prepare(200))
            .catch(res.error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404, reason: 'user.not.found'});
        }
    }

    function update(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.error);
    }

    function remove(req, res, next) {
        User.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.error);
    }

    return {
        create,
        list,
        show,
        update,
        remove
    };
};
