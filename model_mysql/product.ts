import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';
import SaleEntity from './sales';

export interface productAttributes {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

const ProductoEntity = db.define('prodt', {
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
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps: false
});
ProductoEntity.hasMany(SaleEntity,{foreignKey : "product_id"});

export default ProductoEntity;
  