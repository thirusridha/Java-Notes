import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OKTA_CONFIG, OktaAuthStateService, OktaCallbackComponent } from '@okta/okta-angular';
import { ProductService } from './services/product.service';
import { OktaAuth } from '@okta/okta-auth-js';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
// const oktaConfig = myAppConfig.oidc;     
// const oktaAuth = new OktaAuth(oktaConfig);
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'products/user/:id', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProductService,
    OktaAuthStateService],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
