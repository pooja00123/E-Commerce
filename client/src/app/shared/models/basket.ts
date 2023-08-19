import * as cuid from "cuid"

export interface Basket {
    id: string
    items: BasketItem[]
  }
  
  export interface BasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
  }
  // this class is needed because we will have a unique id for every basket.
  // cuid generated a unique string id.
  export class Basket implements Basket {
    id = cuid();
    items : BasketItem[] = [];
  }