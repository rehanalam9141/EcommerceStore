import { inject, Injectable } from '@angular/core';
import { environment } from '../envirments/environment';
import { HttpClient } from '@angular/common/http';
import { CartDto, GetCartDto, GetCartDtobyCustId, GetplaceOrderDto, placeOrderDto } from '../model/cart-dto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.baseUrl
  http = inject(HttpClient)

  //to update add items in cart
  cartUpdated: Subject<boolean>= new Subject<boolean>();
  constructor() { }

  addToCart(cartObj:CartDto):Observable<GetCartDto>{
    return this.http.post<GetCartDto>(this.baseUrl+'AddToCart', cartObj)
  }

  getCatProductbyCustomerId(id:number):Observable<GetCartDtobyCustId>{
    return this.http.get<GetCartDtobyCustId>(this.baseUrl+'GetCartProductsByCustomerId?id='+id)
  }


  deleteProductFromCart(id:number){
    return this.http.get(this.baseUrl+'DeleteProductFromCartById?id='+id)
  }

  placeOrder(orderObj:placeOrderDto):Observable<GetplaceOrderDto>{
    return this.http.post<GetplaceOrderDto>(this.baseUrl+'PlaceOrder', orderObj)
  }

}
