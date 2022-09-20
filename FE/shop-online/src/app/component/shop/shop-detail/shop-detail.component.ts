import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/user/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {CartService} from '../../../service/cart.service';
import {CustomerService} from '../../../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {Customer} from '../../../model/customer';
import {Product} from '../../../model/product';
import {ProductOrder} from '../../../model/product-order';
import {ReloadService} from '../../../service/user/reload.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  product: Product;
  customer: Customer;
  loginStatus: any;
  infoStatus = true;
  username = '';
  role = '';
  idProduct = 0;
  private subscription: Subscription;
  private messageReceived: any;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private cartService: CartService,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private reload: ReloadService) {
    this.subscription = this.reload.getUpdate().subscribe(message => {
      this.messageReceived = message;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      if (value != null) {
        this.getProductById(value.get('id'));
      } else {
        this.getProductById(this.idProduct);
      }
    });
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.auth.getRoles().subscribe(resp => {
          this.getRole(resp);
          this.getCustomerByUsername(resp.username);
        }, () => {
        });
      }
    }, () => {
    });
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
      this.customer = value;
      if (value == null) {
        this.infoStatus = false;
      } else {
        this.infoStatus = true;
      }
    });
  }

  getProductById(id) {
    this.productService.findProductById(id).subscribe(value => {
      if (value != null) {
        console.log(value);
        this.product = value;
      } else {
        this.router.navigateByUrl('/404');
      }
    });
  }

  addToCart(product: Product) {
    const productOrder: ProductOrder = {
      customer: this.customer,
      product,
      quantity: 1
    };
    this.cartService.addOrder(productOrder).subscribe((po: ProductOrder) => {
      this.toastr.success('Thêm thành công sản phẩm ' + po.product.name);
      this.sendMessage();
    }, error => {
      if (error.error.message == 'quantity') {
        this.toastr.warning('Bạn đã thêm vượt quá số lượng sản phẩm!');
      }
    });
  }

  sendMessage(): void {
    this.reload.sendUpdate('Tải lại danh sách');
  }
}
