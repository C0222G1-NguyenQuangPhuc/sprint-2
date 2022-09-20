import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../model/customer';
import {ProductOrder} from '../../../model/product-order';
import {AuthService} from '../../../service/user/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../service/product.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  role = '';
  username = '';
  loginStatus: any;
  customer: Customer;
  productOrders: ProductOrder[] = [];
  totalPages = 0;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private productService: ProductService) {
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.auth.getRoles().subscribe(resp => {
          this.getCustomerByUsername(resp.username);
          this.getRole(resp);
        }, error => {
        });
      }
    }, error => {
    });
  }

  ngOnInit(): void {
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
      return value === 'ROLE_ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_USER';
    });
  }

  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe(value => {
      this.getOrdersByCustomer(0, value);
      this.customer = value;
      if (value == null) {
        this.router.navigateByUrl('/404').then(() => {
          this.toastr.warning('Không tìm thấy thông tin người dùng');
        });
      }
    });
  }

  getOrdersByCustomer(page: number, customer: Customer) {
    this.productService.getOrdersByCustomer(customer).subscribe(value => {
      if (value != null) {
        console.log(value.content);
        this.productOrders = value.content;
        this.totalPages = value.totalPages;
        for (let i = 0; i < this.productOrders.length; i++) {
          this.productOrders[i].totalMoney = this.productOrders[i].quantity * this.productOrders[i].product.price;
        }
      }
    });
  }
}
