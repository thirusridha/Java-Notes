import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';
  private categoryUrl = 'http://localhost:8080/product-category';
  constructor(private httpClient: HttpClient) { }
  getProductList(theCategoryId: number): Observable<Product[]> {
    const serchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.getProducts(serchUrl);
  }
  searchProducts(theKeyword: string): Observable<Product[]> {
    const serchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(serchUrl);
  }
  private getProducts(serchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResonse>(serchUrl).pipe(
      map(response => response._embedded.product)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResonseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}
interface GetResonse {
  _embedded: {
    product: Product[];
  }
}
interface GetResonseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}