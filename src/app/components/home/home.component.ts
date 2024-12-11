import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { CategoryDto, ProductDto } from '../../model/product-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categoryList: CategoryDto[] = [];
  productList: ProductDto[] = [];
  newlyArrivedBrank: ProductDto[] = [];
  cheapestProduct : ProductDto[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.getCategory();
    this.getProducts();
  }

  getCategory() {
    this.productService.getAllCategory().subscribe((result) => {
      this.categoryList = result.data;
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((result) => {
      this.productList = result.data;

      const Product = this.getCheapestProductByCategory(this.productList);

      const shuffalCheapestProduct = this.shuffleArray(Product);
      this.cheapestProduct = shuffalCheapestProduct

      // here we filter the product list on category base and pick the first item of category
      this.newlyArrivedBrank = this.productList.reduce(
        (acc: ProductDto[], product: ProductDto) => {
          // Check if the category already exists in the accumulator
          if (!acc.some((p) => p.categoryName === product.categoryName)) {
            acc.push(product);
          }
          return acc;
        },
        []
      );
    });
  }

  // here we filter the product list on category base and pick Cheapest Product in Each Category
   getCheapestProductByCategory = (products: ProductDto[]) => {
    const filteredProducts = products.reduce((acc: { [key: string]: ProductDto }, product) => {
      // Check if the category already exists in the accumulator
      if (!acc[product.categoryName] || acc[product.categoryName].productPrice > product.productPrice) {
        // If not, or if the current product is cheaper, update it
        acc[product.categoryName] = product;
      }
      return acc;
    }, {});
  
    // Return the values (which are the cheapest products from each category)
    return Object.values(filteredProducts);
  };



// shuffle the cheapest product list 
shuffleArray(products: ProductDto[]): ProductDto[] {
  let shuffledArray = [...products];  // Create a copy of the products array to avoid mutating the original one
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
  }
  return shuffledArray;
}
  
  
  
}
