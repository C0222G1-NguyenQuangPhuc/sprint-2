import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {CartComponent} from './component/cart/cart.component';
import {Page401Component} from './component/error/page401/page401.component';
import {Page404Component} from './component/error/page404/page404.component';
import {Page403Component} from './component/error/page403/page403.component';
import {ShopListComponent} from './component/shop/shop-list/shop-list.component';
import {ShopDetailComponent} from './component/shop/shop-detail/shop-detail.component';
import {UserOrderComponent} from './component/user/user-order/user-order.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:name', component: ShopListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detail/:id', component: ShopDetailComponent},
  {path: 'shop', component: ShopListComponent},
  {path: 'cart', component: CartComponent},
  {path: '401', component: Page401Component},
  {path: '403', component: Page403Component},
  {path: '404', component: Page404Component},
  {path: 'order', component: UserOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
