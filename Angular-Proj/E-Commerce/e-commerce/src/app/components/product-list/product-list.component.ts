import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  currentCategoryId!: number;
  searchMode!: boolean;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    debugger
  }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })

  }
  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode)
      this.handleSearchProduct();
    else
      this.handleListProduct();
  }
  handleSearchProduct() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  handleListProduct() {
    debugger
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (hasCategoryId !== null && categoryId) {
      this.currentCategoryId = +categoryId;
    } else
      this.currentCategoryId = 1;

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}