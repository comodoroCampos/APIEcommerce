import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';

export interface productAttributes {
  id: number;
  amount: number;
  status: string;
  product_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

const SaleEntity = db.define('sale', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    amount: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
      },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    product_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
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
    tableName: 'sales',
    timestamps: false
});


export default SaleEntity;
  