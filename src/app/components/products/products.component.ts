import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'
import {MatIcon} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { ProductService } from '../../services/product.service';
import { CategoryDto, ProductDto } from '../../model/product-dto';
import { CartService } from '../../services/cart.service';
import { CartDto, GetCartDto } from '../../model/cart-dto';
import { AuthService } from '../../services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GetLoginDto, registerDto, userDto } from '../../model/auth-dto';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIcon,
    CommonModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private _snackBar = inject(MatSnackBar);

  productList: ProductDto[] = [];
  categoryList: CategoryDto[] = [];
  selectedCategory: number = 0;
  isloading = false;
  userData!: userDto;

  

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getProducts();
    this.getCategory();
    this.userData = this.authService.getUser!;
  }
  getProducts() {
    this.isloading = true;
    this.productService.getAllProducts().subscribe((result) => {
      this.productList = result.data;
      this.isloading = false;
    });
  }

  getCategory() {
    this.productService.getAllCategory().subscribe((result) => {
      this.categoryList = result.data;
    });
  }

  getProductsByCategoryId(categoryId: number) {
    this.selectedCategory = categoryId;
    this.productService
      .getCategoryProductById(categoryId)
      .subscribe((result) => {
        this.productList = result.data;
      });
  }

  addToCart(selectedProductId: number) {
    
    if (this.userData == null || this.userData == undefined) {
      this.router.navigateByUrl('/login');
    } 

    else {
      const cart = new CartDto();
      cart.CartId = 0;
      cart.Quantity = 1;
      cart.CustId = this.userData.custId;
      cart.ProductId = selectedProductId;
      cart.AddedDate = new Date();

      this.cartService.addToCart(cart).subscribe({
        next: (result: GetCartDto) => {
          this.cartService.cartUpdated.next(true)
          this._snackBar.open('added successfully', 'X', {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error: GetCartDto) => {
          error.message;
          this._snackBar.open(error.message, 'X', {
            duration: 3000,
            panelClass: ['danger-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          return;
        },
      });
    }
  }
}
