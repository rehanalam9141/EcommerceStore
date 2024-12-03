export class GetCartDto {
    message!: string;
    result!: boolean;
    data!: CartDto;
  }
  
export class CartDto {
    CartId=0;
    CustId!: number
    ProductId!: number
    Quantity=1
    AddedDate= new Date()
  }
  
// get all cart by customer id
export class GetCartDtobyCustId {
  message!: string;
  result!: boolean;
  data!: CartDtobyCustId[];
}

export class CartDtobyCustId {
  cartId=0;
  custId!: number;
  productId!: number;
  quantity=1;
  addedDate= new Date();
  productName!:string;
  categoryName!:string;
  productImageUrl!:string;
  productPrice!:number;

}


//order place dto

export class GetplaceOrderDto {
  message!: string;
  result!: boolean;
  data!: placeOrderDto;
}
export class placeOrderDto {
  SaleId!: number
  CustId!: number
  SaleDate!: string
  TotalInvoiceAmount!: number
  Discount!: number
  PaymentNaration!: string
  DeliveryAddress1!: string
  DeliveryAddress2!: string
  DeliveryCity!: string
  DeliveryPinCode!: string
  DeliveryLandMark!: string
}
