import {Sequelize}  from 'sequelize';


//const db = new Sequelize('postgres://postgres:SerSaa***2021@192.168.61.38:5432/municipalidad')
//const db = new Sequelize('mssql://sa:gemini491110!@192.168.1.22:1433/aep')


const db = new Sequelize(
  process.env.DB_DATABASE ||'ccl50745_api',
  process.env.DB_USERNAME || 'ccl50745_api',
  process.env.DB_PASSWORD || 'hc(rHIdOs$A_',
    {
      host: process.env.DB_HOST ||'190.107.177.232',
      port: 3306,
      dialect: "mssql",
    }
  );
export default db;