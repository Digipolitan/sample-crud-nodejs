module.exports = (api) => {
    api.middlewares = {
        bodyParser: require('body-parser'),
        logger: require('./logger'),
        res: require('./res'),
        isAuthenticated: require('./isAuthenticated')(api),
        isAuthorized: require('./isAuthorized')(api),
        ensureFields: require('./ensureFields'),
        exclude: require('./exclude')
    };
};
