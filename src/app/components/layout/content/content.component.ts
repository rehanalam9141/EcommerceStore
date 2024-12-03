import { ProductsComponent } from './../../products/products.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {

}
