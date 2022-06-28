import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';


export interface categoryAttributes {
    id: number;
    name: string;
    slug: string;
    icon: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
  }

const CategoryEntity = db.define('cat', {
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
      icon: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    tableName: 'categories',
    timestamps: false
});


export default CategoryEntity;
  