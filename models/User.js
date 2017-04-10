module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let UserSchema = Schema({
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        first_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required: false
        }
    });

    return mongoose.model('User', UserSchema);
};