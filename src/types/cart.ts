import type { PRODUCTS } from "./../data/data";
import type { Product } from "./product";

export interface CartItem {
    product: Product;
    quantity: number;
}