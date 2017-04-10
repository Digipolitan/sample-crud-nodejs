module.exports = (api) => {
    api.actions = {
        users: require('./users')(api),
        auth: require('./auth')(api)
    };
};
