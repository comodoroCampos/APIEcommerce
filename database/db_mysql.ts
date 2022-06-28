import {Sequelize}  from 'sequelize';

const db = new Sequelize(
  process.env.DB_DATABASE ||'api_ecommerce',
  process.env.DB_USERNAME || 'reporte',
  process.env.DB_PASSWORD || 'Reporte2022',
    {
      host: process.env.DB_HOST ||'database-mysql.cbbkogyfaxh5.us-east-1.rds.amazonaws.com',
      port: 3306,
      dialect: "mysql",
    }
  );
export default db;