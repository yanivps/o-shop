import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AdminModule } from 'app/admin/admin.module';
import { CoreModule } from 'app/core/core.module';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NoAccessComponent } from './core/components/no-access/no-access.component';
import { ProductsComponent } from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
