import {Sequelize}  from 'sequelize';

const db = new Sequelize(
  process.env.DB_DATABASE ||'ccl50745_api',
  process.env.DB_USERNAME || 'ccl50745_api',
  process.env.DB_PASSWORD || 'hc(rHIdOs$A_',
    {
      host: process.env.DB_HOST ||'190.107.177.232',
      port: 3306,
      dialect: "mysql",
    }
  );
export default db;