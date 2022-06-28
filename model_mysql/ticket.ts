import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/db_mysql';


export interface ticketAttributes {
    id: number;
    ticket_amount: number;
    nro_ticket: number;
    sale_id?: number;
    created_at?: Date;
    updated_at?: Date;
  }

const TicketEntity = db.define('ticke', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      ticket_amount: {
        type: DataTypes.DECIMAL(8,3),
        allowNull: false
      },
      nro_ticket: {
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
    tableName: 'tickets',
    timestamps: false
});


export default TicketEntity;
  