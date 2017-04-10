module.exports = (api) => {
    api.use(api.middlewares.logger);
    api.use(api.middlewares.res);
    api.use(api.middlewares.isAuthorized);

    api.use('/users', require('./users')(api));
    api.use('/auth', require('./auth')(api));
};