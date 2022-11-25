const config = require("dotenv")
config.config();

let configuration = {
    port:process.env.PORT,
};

module.exports = configuration;