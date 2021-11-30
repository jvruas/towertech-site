"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.js`)[env];
var db = {};
var databases = Object.keys(config.databases);

console.warn(
    `\n===> você está no ambiente: ${env}\n \tSe dev, usando Workbench local\n\tSe production, usando nuvem Azure`
);

db["Database1"] = new Sequelize(
    config.databases.Database1.database,
    config.databases.Database1.username,
    config.databases.Database1.password,
    config.databases.Database1
);

db["Database2"] = new Sequelize(
    config.databases.Database2.database,
    config.databases.Database2.username,
    config.databases.Database2.password,
    config.databases.Database2
);

// if (config.use_env_variable) {
//     var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     var sequelize = new Sequelize(
//         config.database,
//         config.username,
//         config.password,
//         config
//     );
// }

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = db.Database1.import(path.join(__dirname, file));
        db[model.name] = model;
    });

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = db.Database2.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// console.log(db.Database1);
// console.log(db.Database2);

module.exports = db;
