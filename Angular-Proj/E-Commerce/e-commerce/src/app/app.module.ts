import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { OKTA_CONFIG, OktaAuthModule, OktaAuthStateService } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordComponent } from './components/password/password.component';
// import { NoopAnimationPlayer } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { customInterceptor } from './services/custom.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterComponent,
    PasswordComponent

  ],
  imports: [
    OktaAuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    // BrowserAnimationsModule 
    NoopAnimationsModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [provideHttpClient(withInterceptors([customInterceptor])), LoginComponent, RegisterComponent, LoginPageComponent, ProductListComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }