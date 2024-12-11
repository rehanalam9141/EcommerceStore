import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../model/product-dto';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productId!: number;
  product!: ProductDto;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(result => {
        this.product = result.data;
      });
    }
  }

}
