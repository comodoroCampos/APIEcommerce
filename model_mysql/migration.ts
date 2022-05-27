import db from '../database/db_mysql';
import { DataTypes, Model, Optional } from 'sequelize';

export interface migrationAttributes {
  id: number;
  migration: string;
  batch: number;
}

const MigrationEntity = db.define('migr', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    migration: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    batch: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'migrations',
    timestamps: false
});


export default MigrationEntity;


