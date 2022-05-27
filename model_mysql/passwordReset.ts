import db from '../database/db_mysql';
import { DataTypes, Model, Optional } from 'sequelize';

export interface passwordResetAttributes {
  email: string;
  token: string;
  created_at?: Date;
}

const PasswordResetEntity = db.define('passres', {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'password_resets',
    timestamps: false
});


export default PasswordResetEntity;

