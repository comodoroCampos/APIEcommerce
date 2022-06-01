import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';
import ProductoEntity from './product';
import UserEntity from './user';

export interface productAttributes {
  id: number;
  amount: number;
  status: string;
  product_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

const SaleEntity = db.define('ventas', {
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
      type: DataTypes.BIGINT,
      allowNull: false,

   
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
  
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
SaleEntity.belongsTo(UserEntity,{foreignKey : "user_id"});
export default SaleEntity;
  