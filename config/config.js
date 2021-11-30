module.exports = {
    // Insira aqui seus dados do banco NA NUVEM AZURE
    production: {
        // altere APENAS username, password, database e host.
        username2: "TowerTech",
        password2: "#Gfgrupo3",
        database2: "TowerTech",
        host: "server-tower-tech.database.windows.net",
        dialect: "mssql",
        xuse_env_variable: "DATABASE_URL",
        dialectOptions: {
            options: {
                encrypt: true,
            },
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 5000,
            idle: 30000,
            connectTimeout: 5000,
        },
    },

    // Insira aqui seus dados do banco LOCAL - MySQL Workbench
    dev: {
        databases: {
            Database1: {
                username: "root",
                password: "urubu100",
                database: "towertech",
                host: "ec2-18-215-64-123.compute-1.amazonaws.com",
                // port: "3306",
                dialect: "mysql",
                xuse_env_variable: "DATABASE_URL",
                dialectOptions: {
                    options: {
                        encrypt: true,
                    },
                },
                pool: {
                    max: 5,
                    min: 1,
                    acquire: 5000,
                    idle: 30000,
                    connectTimeout: 5000,
                },
            },
            Database2: {
                username: "TowerTech",
                password: "#Gfgrupo3",
                database: "towertech",
                host: "server-tower-tech.database.windows.net",
                // port: "1433",
                dialect: "mssql",
                xuse_env_variable: "DATABASE_URL",
                dialectOptions: {
                    options: {
                        encrypt: true,
                    },
                },
                pool: {
                    max: 5,
                    min: 1,
                    acquire: 5000,
                    idle: 30000,
                    connectTimeout: 5000,
                },
            },
        },
    },
};
