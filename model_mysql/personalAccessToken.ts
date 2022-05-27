import db from '../database/db_mysql';
import { DataTypes, Model, Optional } from 'sequelize';

export interface personalAccessTokenAttributes {
  id: number;
  tokenable_type: string;
  tokenable_id: number;
  name: string;
  token: string;
  abilities?: string;
  last_used_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}


const PersonalEntity = db.define('personal', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    tokenable_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tokenable_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "personal_access_tokens_token_unique"
    },
    abilities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_used_at: {
      type: DataTypes.DATE,
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
    tableName: 'personal_access_tokens',
    timestamps: false
});

export default PersonalEntity;