import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {CartComponent} from './component/cart/cart.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import {JwtInterceptor} from './service/user/http.interceptor';
import {Page401Component} from './component/error/page401/page401.component';
import {Page403Component} from './component/error/page403/page403.component';
import {Page404Component} from './component/error/page404/page404.component';
import {ShopListComponent} from './component/shop/shop-list/shop-list.component';
import {ShopDetailComponent} from './component/shop/shop-detail/shop-detail.component';
import { UserInfoComponent } from './component/user/user-info/user-info.component';
import { UserOrderComponent } from './component/user/user-order/user-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CartComponent,
    Page401Component,
    Page403Component,
    Page404Component,
    ShopListComponent,
    ShopDetailComponent,
    UserInfoComponent,
    UserOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true
      }
    ),
    NgxPaginationModule,
  ],
  providers: [
    // {provide: APP_BASE_HREF, useValue: '/', },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
