module.exports = (api) => {
    api.settings = require('./settings.json');

    if (process.env.NODE_ENV == "production")
        updateSettingsFromEnv();

    function updateSettingsFromEnv() {
        api.settings.port = process.env.PORT;
        api.settings.mongo.url = process.env.MONGO_URI;
    }
};
