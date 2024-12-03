import { Component, inject } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GetLoginDto, registerDto, userDto } from '../../../model/auth-dto';
import { tick } from '@angular/core/testing';
import { CartService } from '../../../services/cart.service';
import { CartDtobyCustId, GetCartDtobyCustId } from '../../../model/cart-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatBadgeModule,MatMenuModule,MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  userData!:userDto
  authService = inject(AuthService)
  isLogin : boolean = false;
  cartData:CartDtobyCustId[]=[]
  cartbadge!:number;
  showTotalSum!:number;
  cartbadgeShow!:boolean

  private _snackBar = inject(MatSnackBar);
  constructor(private router:Router, private cartService:CartService) {


    const localUser = localStorage.getItem('user');
    if(localUser){
      this.authService.getUser = JSON.parse(localUser);
       this.userData =  this.authService.getUser
      this.getCartData(this.userData.custId);
  
    }
  }
  

   ngOnInit(): void {
    
    this.authService.isLoggedIn$.subscribe(result=>{
      // this.userData =  this.authService.getUser;
      this.isLogin = this.authService.isLoggedIn();
      
    })

    this.authService.getUser$.subscribe(result=>{
      this.userData =  this.authService.getUser;
    })
    
    this.cartService.cartUpdated.subscribe((result:boolean)=>{
      if(result || this.cartbadge >= 0){
        this.userData =  this.authService.getUser
        this.getCartData(this.userData.custId);
        console.log("customer id",this.userData.custId)
        console.log("first card item add")
        
      }
    })
   }

   getCartData(id:number){
    this.cartService.getCatProductbyCustomerId(id).subscribe({
      next:(result:GetCartDtobyCustId)=>{
        this.cartData = result.data
        this.cartbadge = result.data.length
        this.showTotalSum = this.totalSum
        this.cartbadgeShow = false
        if(this.cartbadge<=0)
        {
          this.cartbadgeShow = true
        }
      },
      error:(error:GetCartDtobyCustId)=>{
          error.message;
          return;
      }
    })
   }

    // Calculate the total sum of items in the cart
  get totalSum(): number {
    return this.cartData.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  }


   deleteProductFromCart(id:number){
    this.cartService.deleteProductFromCart(id).subscribe({
      next:(result)=>{
        this.cartService.cartUpdated.next(true);
        this._snackBar.open('Product removed from cart', 'X', {
          duration: 2000,
          panelClass: ['custom-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

      }
    })
   }

   logout(){
    this.userData = new userDto();
    localStorage.clear();
    this.authService.isLoggedIn$.next(false)
    this.router.navigateByUrl('/login')
   }
}
