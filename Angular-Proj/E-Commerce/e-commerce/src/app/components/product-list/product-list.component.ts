import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  buttonValue: any = "Add to Cart";
  count: any;
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousKeyword: string = "";
  constructor(private loginComponent: LoginComponent, private cartService: CartService, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    debugger
    // this.cartService.totalPrice.subscribe(
    //   data => {
    //     // this.cartStatus.totalPrice = data;
    //   }
    // )
    this.productService.count.subscribe(
      data => this.count = data
    )

  }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })

  }
  incrementByOne(theProduct: Product) {
    debugger
    if (theProduct.count == null) {
      // theProduct.count = theProduct.valueOnbutton;
      theProduct.count = 1;
      this.productService.addCount(theProduct.count);
    } else {
      theProduct.count = theProduct.count + 1;
      this.productService.addCount(theProduct.count);
      console.log(theProduct);
    }
    let tkn = localStorage.getItem('token');
    if (tkn == null) {
      debugger
      this.loginComponent.onButtonClick();
      // alert('add to cart is ')
    } if (tkn != null) {
      debugger
      const theCartItem = new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);
      this.cartService
    }
    // theProduct.count++;
  }
  decrementByOne(theProduct: Product) {
    this.buttonValue = theProduct.count--;
    let tkn = localStorage.getItem('token');
    if (tkn == null) {
      debugger
      this.loginComponent.onButtonClick();
      // alert('add to cart is ')
    } if (tkn != null) {
      debugger
      const theCartItem = new CartItem(theProduct);
      theCartItem.quantity = theProduct.count;
      // this.cartService.decreamentQuantity(theCartItem);
      this.cartService.computeCartTotal(theCartItem);
    }
  }
  listProduct() {
    debugger
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode)
      this.handleSearchProduct();
    else
      this.handleListProduct();
  }
  handleSearchProduct() {
    debugger
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    this.productService.searchProductListPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(
      this.processResult());
  }
  processResult() {
    debugger
    return (data: any) => {
      console.log(data);
      let pr = Product;
      debugger
      this.products = data._embedded.product;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      // this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
      // this.product=this.products.findIndex(data=>data.id===this.products.id);
      // pr = this.products.find(tempCartItem => tempCartItem.id === this.products);
      this.products[0].count = 0;
    };
  }
  handleListProduct() {
    debugger
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (hasCategoryId !== null && categoryId) {
      this.currentCategoryId = +categoryId;
    } else
      this.currentCategoryId = 1;
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`)

    this.productService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId
    ).subscribe(
      this.processResult()
    )
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // )

  }
  updatePageSize(pageSize: string) {
    debugger
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProduct();
  }
  addToCart(theProduct: Product) {
    this.incrementByOne(theProduct);
    debugger


  }
}