import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';
import SaleEntity from './sales';

export interface userAttributes {
  id: number;
  name: string;
  email: string;
  email_verified_at?: Date;
  password: string;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;
}



const UserEntity = db.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_email_unique"
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
});
UserEntity.hasMany(SaleEntity,{foreignKey : "user_id"});

export default UserEntity;