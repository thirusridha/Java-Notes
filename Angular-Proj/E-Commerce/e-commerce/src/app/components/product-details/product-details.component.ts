import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}


