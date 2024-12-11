import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse, GetProductByIdDto, GetProductDto, ProductDto } from '../model/product-dto';
import { environment } from '../envirments/environment';
import { GetCartDtobyCustId } from '../model/cart-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  http = inject(HttpClient)
  constructor() { }

  getAllProducts():Observable<GetProductDto>{
    return this.http.get<GetProductDto>(this.baseUrl+'GetAllProducts')
  }


  //Category api
  getAllCategory():Observable<CategoryResponse>{
    return this.http.get<CategoryResponse>(this.baseUrl+'GetAllCategory')
  }

  getCategoryProductById(id:number):Observable<GetProductDto>{
    return this.http.get<GetProductDto>(this.baseUrl+'GetAllProductsByCategoryId?Id='+id)
    // return this.http.get<GetProductDto>(`this.baseUrl+'GetAllProductsByCategoryId?Id=${id}'`)
  }


  getProductById(id:number):Observable<GetProductByIdDto>{
    return this.http.get<GetProductByIdDto>(this.baseUrl+'GetProductById?id='+id)
  }

}
