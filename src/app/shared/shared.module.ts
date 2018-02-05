import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-4-data-table';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { IncrementorComponent } from 'shared/components/incrementor/incrementor.component';
import { OrderComponent } from 'shared/components/order/order.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ShoppingCartCounterComponent } from 'shared/components/shopping-cart-counter/shopping-cart-counter.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    IncrementorComponent,
    OrderComponent,
    ShoppingCartCounterComponent,
  ],
  exports: [
    ProductCardComponent,
    IncrementorComponent,
    ShoppingCartCounterComponent,
    CommonModule,
    DataTableModule,
    FormsModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
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
