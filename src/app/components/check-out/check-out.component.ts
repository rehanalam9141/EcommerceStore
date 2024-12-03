import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { userDto } from '../../model/auth-dto';
import { AuthService } from '../../services/auth.service';
import { CartDtobyCustId, GetCartDtobyCustId, GetplaceOrderDto, placeOrderDto } from '../../model/cart-dto';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {


  userData!:userDto
  cartData:CartDtobyCustId[]=[]
  placeOrderShow:boolean=true
  showTotalSum!:number;
  orderForm!:FormGroup

  authService = inject(AuthService)
  private _snackBar = inject(MatSnackBar);
  constructor(private router:Router, private cartService:CartService,private fb:FormBuilder) {
     
      
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userData =  this.authService.getUser
    this.getCartData(this.userData.custId)
    
  this.cartService.cartUpdated.subscribe((result:boolean)=>{
    if(result){
      this.getCartData(this.userData.custId);
    }
  })
  
    this.orderForm = this.createOrderForm()

  }

      // Calculate the total sum of items in the cart
      get totalSum(): number {
        return this.cartData.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
      }

  getCartData(id:number){
    this.cartService.getCatProductbyCustomerId(id).subscribe({
      next:(result:GetCartDtobyCustId)=>{
        this.cartData = result.data
        this.showTotalSum = this.totalSum;


        // fill some form property of order place
        this.orderForm.get('CustId')?.patchValue(this.userData.custId)
        this.orderForm.get('PaymentNaration')?.patchValue("Online Payment")
        this.orderForm.get('TotalInvoiceAmount')?.patchValue(this.showTotalSum)

        if (this.cartData.length <= 0) {
          this.placeOrderShow = false
        }
      },
      error:(error:GetCartDtobyCustId)=>{
        this._snackBar.open(error.message,'X',{
          duration:3000,
          panelClass: ['danger-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
          return;
      }
    })
   }


   //place order


   getPlaceOrder(){
    var order:placeOrderDto = this.orderForm.value
    return this.cartService.placeOrder(order).subscribe({
      next:(result: GetplaceOrderDto)=>{
        this.cartService.cartUpdated.next(false);
        this.getCartData(this.userData.custId);
        if (result) {
        
        this._snackBar.open(result.message,'X',{
          duration:3000,
          panelClass: ['custom-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
        this.router.navigateByUrl('/products')
      }

      },
      error:(error: GetplaceOrderDto)=>{
        this._snackBar.open(error.message,'X',{
          duration:3000,
          panelClass: ['danger-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
        return;
      },
    })
   }
   //get place order control 

   private createOrderForm(): FormGroup{
    
    return this.fb.group({
      SaleId: [0,Validators.required],
      CustId: [0,Validators.required],
      SaleDate: [new Date(),Validators.required],
      TotalInvoiceAmount: [0,Validators.required],
      Discount: [0,Validators.required],
      PaymentNaration: ["",Validators.required],
      DeliveryAddress1: ["",Validators.required],
      DeliveryAddress2: ["",Validators.required],
      DeliveryCity: ["",Validators.required],
      DeliveryPinCode: ["",Validators.required],
      DeliveryLandMark: ["",Validators.required],

    })
   }

}
