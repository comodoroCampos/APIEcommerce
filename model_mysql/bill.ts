import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';


export interface billAttributes {
    id: number;
    bill_amount: number;
    nro_bill: number;
    sale_id?: number;
    created_at?: Date;
    updated_at?: Date;
  }

const BillEntity = db.define('bils', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      bill_amount: {
        type: DataTypes.DECIMAL(8,3),
        allowNull: false
      },
      nro_bill: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sale_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'sales',
          key: 'id'
        }
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
    tableName: 'bills',
    timestamps: false
});


export default BillEntity;
  