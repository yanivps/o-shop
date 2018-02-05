import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IncrementorComponent } from 'shared/components/incrementor/incrementor.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    IncrementorComponent
  ],
  exports: [
    ProductCardComponent,
    IncrementorComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ProductService,
    CategoryService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
