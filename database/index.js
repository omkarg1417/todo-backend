const {Sequelize} = require('sequelize');
const { sequelize_database,
    sequelize_username,
    sequelize_password,
    sequelize_host,
    sequelize_dialect, } = require("../config"); 

const sequelize = new Sequelize(
    sequelize_database,
    sequelize_username,
    sequelize_password,
    {
        host: sequelize_host,
        dialect: "postgres"
    }
)

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("CONNECTION ESTABLISHED WITH DB----------------------------");
    } catch(err) {
        console.log("UNABLE TO CONNECT WITH DB: " + err);
    }
})();


module.exports = sequelize;