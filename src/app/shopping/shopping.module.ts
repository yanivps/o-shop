import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckOutComponent } from 'app/shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from 'app/shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'app/shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from 'app/shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { ShippingFormComponent } from 'app/shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartCounterComponent } from 'app/shopping/components/shopping-cart-counter/shopping-cart-counter.component';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from 'app/shopping/components/shopping-cart/shopping-cart.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { OrderComponent } from 'shared/components/order/order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders/:id', component: OrderComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartCounterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  exports: [
    ShoppingCartCounterComponent
  ]
})
export class ShoppingModule { }