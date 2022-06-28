import { productAttributes } from '../model_mysql/product';
import { userAttributes } from '../model_mysql/user';
export interface VentasAttributes {
    id: number;
    amount: number;
    status: string;
    producto: productAttributes;
    user: userAttributes;
    created_at?: Date;
    updated_at?: Date;
  }


export interface VentasCompletas {
  sales: VentaCompleta[];
}

export interface VentaCompleta {
  id:             number;
  producto:       string;
  usuario:        string;
  mount:          string;
  estatus:        string;
  fecha_creacion: Date;
}
export interface ProductoInventario {
  nombre:      string;
  descripcion: string;
  precio:      string;
  stock:       number;
}

export interface FacturaElement {
  nro_bill:    number;
  sale_id:     number;
  bill_amount: string;
  created_at:  Date;
  status:      string;
  name:        string;
  producto:        string;
}
export interface TicketElement {
  nro_ticket:    number;
  sale_id:       number;
  ticket_amount: string;
  created_at:    Date;
  status:        string;
  name:          string;
  producto:          string;
}