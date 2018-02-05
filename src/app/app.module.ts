import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-4-data-table';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminModule } from 'app/admin/admin.module';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { OrderComponent } from './shared/components/order/order.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartCounterComponent } from './shopping/components/shopping-cart-counter/shopping-cart-counter.component';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { ShoppingModule } from 'app/shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ]),
    NgbModule.forRoot(),
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
