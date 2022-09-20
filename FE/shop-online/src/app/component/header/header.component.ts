import {Component, OnInit} from '@angular/core';
import {LogoutService} from '../../service/user/logout.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/user/auth.service';
import {ReloadService} from '../../service/user/reload.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../service/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../../model/customer';
import {CustomerService} from '../../service/customer.service';
import {CartService} from '../../service/cart.service';
import {ProductOrder} from '../../model/product-order';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  btnLoginStatus = true;
  loginStatus: any;
  username: string;
  private subscriptionName: Subscription;
  messageReceived: any;
  totalProductInCart = 0;
  name = '';
  formSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private logout: LogoutService,
              private toastr: ToastrService,
              private router: Router,
              private auth: AuthService,
              private reload: ReloadService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private customerService: CustomerService,
              private cartService: CartService) {
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      this.role = this.readLocalStorage('role');
      this.username = this.readLocalStorage('username');
      if (value) {
        this.auth.getRoles().subscribe(resp => {
          this.getRole(resp);
          this.getCustomerByUsername(resp.username);
        }, error => {
        });
      }
    }, error => {
      localStorage.clear();
    });
    this.subscriptionName = this.reload.getUpdate().subscribe(message => {
      this.messageReceived = message;
      this.auth.checkLogin().subscribe(value => {
        this.loginStatus = value;
        if (value) {
          this.auth.getRoles().subscribe(resp => {
            this.getRole(resp);
            this.getCustomerByUsername(resp.username);
          }, error => {
          });
        }
      }, error => {
      });
    });
  }

  ngOnInit(): void {
  }

  readLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  getRole(value: any) {
    if (this.isAdmin(value.grantList)) {
      this.role = 'ADMIN';
    } else if (this.isUser(value.grantList)) {
      this.role = 'USER';
    }
    this.username = value.username;
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'USER';
    });
  }

  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe((value: Customer) => {
      if (value == null) {
        this.loginStatus = false;
      } else {
        this.loginStatus = true;
        this.name = value.name;
        this.getProductInCardByCustomer(value);
      }
    });
  }

  getProductInCardByCustomer(customer: Customer) {
    this.totalProductInCart = 0;
    this.cartService.getProductInCardByCustomer(customer).subscribe((pos: ProductOrder[]) => {
      if (pos != null) {
        for (let i = 0; i < pos.length; i++) {
          this.totalProductInCart += pos[i].quantity;
        }
      }
    });
  }

  onLogout() {
    this.btnLoginStatus = false;
    this.logout.onLogout().subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login').then(() => {
          this.toastr.success('Đăng xuất thành công');
          this.btnLoginStatus = true;
          this.sendMessage();
        });
        localStorage.clear();
      }, 2000);
    });
  }

  sendMessage(): void {
    this.reload.sendUpdate('Đăng Xuất thành công');
  }

  searchByName() {
    this.router.navigate(['/search', this.formSearch.value.name]).then(value => {
      this.formSearch.reset();
    });
  }
}
