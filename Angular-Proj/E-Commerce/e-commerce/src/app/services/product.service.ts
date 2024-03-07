import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';
  private categoryUrl = 'http://localhost:8080/product-category';
  count: Subject<any> = new BehaviorSubject<any>(0);

  addCount(count: any) {
    this.count.next(count);
  }

  constructor(private httpClient: HttpClient) { }
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.getProducts(searchUrl);
  }
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResonse> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResonse>(searchUrl);
  }
  searchProducts(theKeyword: string): Observable<Product[]> {
    const serchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(serchUrl);
  }
  searchProductListPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResonse> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResonse>(searchUrl);
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
  getProduct(theCategoryId: any): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theCategoryId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}
interface GetResonse {
  _embedded: {
    product: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetResonseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}