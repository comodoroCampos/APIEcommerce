import db from '../database/db_mysql';
import { DataTypes, literal, Model, Optional } from 'sequelize';

export interface failedJobAttributes {
  id: number;
  uuid: string;
  connection: string;
  queue: string;
  payload: string;
  exception: string;
  failed_at: Date;
}

const FailedJobEntity = db.define('fails', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "failed_jobs_uuid_unique"
    },
    connection: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    queue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    exception: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    failed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'failed_jobs',
    timestamps: false
});


export default FailedJobEntity;


