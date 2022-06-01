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