import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';


export interface subcategoryAttributes {
    id: number;
    name: string;
    slug: string;
    image: string;
    color: number;
    size: number;
    category_id: number;
    created_at?: Date;
    updated_at?: Date;
  }

const SubCategoryEntity = db.define('sub', {
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
      image: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      color: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      size: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
    }
  }, {
    tableName: 'subcategories',
    timestamps: false
});


export default SubCategoryEntity;
  