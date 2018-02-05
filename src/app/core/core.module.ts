import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'app/core/components/navbar/navbar.component';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { NoAccessComponent } from 'app/core/components/no-access/no-access.component';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
