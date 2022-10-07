export class ProductI{
  constructor(
    public _id:string,
    public name:string,
    public id_category:string,
    public purchase_price:number,
    public sale_price:number,
    public stock: number,
  )
  {

  }
}
