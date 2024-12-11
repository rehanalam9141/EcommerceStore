import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryDto, ProductDto } from '../../model/product-dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartDto, GetCartDto } from '../../model/cart-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userDto } from '../../model/auth-dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoryList: CategoryDto[] = [];
  selectedCategory: number = 0;
  productList: ProductDto[] = [];
  userData!: userDto;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private productService: ProductService,
    private authService:AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.getCategory();
    this.userData = this.authService.getUser!;
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

  ProductDetail(id:number){
    this.router.navigateByUrl("productdetail/"+id)
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
