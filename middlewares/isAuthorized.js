module.exports = (api) => {
    const API_KEY = api.settings.security.api_key;

    return (req, res, next) => {
        const apiKey = req.get('apiKey');

        if (!apiKey || apiKey != API_KEY) {
            return forbidden();
        }

        next();

        function forbidden() {
            return res.status(401).send('unauthorized');
        }
    };
};
