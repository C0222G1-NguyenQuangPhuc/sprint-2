import {Component, OnInit} from '@angular/core';
import {Customer} from '../../model/customer';
import {ProductOrder} from '../../model/product-order';
import {AuthService} from '../../service/user/auth.service';
import {CustomerService} from '../../service/customer.service';
import {CartService} from '../../service/cart.service';
import {ToastrService} from 'ngx-toastr';
import {ReloadService} from '../../service/user/reload.service';
import {render} from 'creditcardpayments/creditCardPayments';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  role: string;
  username = '';
  loginStatus: any;
  customer: Customer;
  productOrders: ProductOrder[] = [];
  totalMoney = 0;

  constructor(private auth: AuthService,
              private customerService: CustomerService,
              private cartService: CartService,
              private toastr: ToastrService,
              private reload: ReloadService,
              private router: Router) {
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.auth.getRoles().subscribe(resp => {
          this.getCustomerByUsername(resp.username);
        }, error => {
        });
      } else {

      }
    }, error => {
    });
  }

  ngOnInit(): void {
  }

  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe(value => {
      this.customer = value;
      this.getProductInCardByCustomer(value);
    });
  }

  getProductInCardByCustomer(customer: Customer) {
    this.cartService.getProductInCardByCustomer(customer).subscribe((pos: ProductOrder[]) => {
      if (pos != null) {
        this.productOrders = pos;
        this.calculateTotalMoney(pos);
      } else {
        this.productOrders = [];
      }
    });
  }

  private calculateTotalMoney(pos: ProductOrder[]) {
    this.totalMoney = 0;
    for (let i = 0; i < pos.length; i++) {
      this.totalMoney += (pos[i].product.price * pos[i].quantity);
    }
  }

  goPayment() {
    document.getElementById('myPaypalButtons').innerHTML = '<div id="btnPayPal"></div>';
    if (this.totalMoney > 0) {
      render(
        {
          id: '#myPaypalButtons',
          currency: 'USD',
          value: (this.totalMoney / 23000).toFixed(2),
          onApprove: (details) => {
            if (details.status === 'COMPLETED') {
              this.onPaymentSuccess();
              this.toastr.success('Thanh toán thành công');
            }
          }
        }
      );
    } else {
      this.toastr.warning('Không có sản phẩm nào để thanh toán');
    }
  }

  minusQuantity(productOrder: ProductOrder) {
    this.cartService.minusQuantity(productOrder).subscribe(value => {
      this.productOrders = value;
      this.calculateTotalMoney(value);
      this.goPayment();
      this.sendMessage();
    }, error => {
      if (error.error.message == 'minimum') {
        this.deleteProductInCart(productOrder);
      }
    });
  }

  plusQuantity(productOrder: ProductOrder) {
    this.cartService.plusQuantity(productOrder).subscribe(value => {
      this.productOrders = value;
      this.calculateTotalMoney(value);
      this.goPayment();
      this.sendMessage();
    }, error => {
      if (error.error.message == 'maximum') {
        this.toastr.warning('Số lượng sản phẩm đã tối đa.');
      }
    });
  }

  maximumQuantity() {
    this.toastr.warning('Số lượng sản phẩm đã tối đa.');
  }

  deleteProductInCart(po: ProductOrder) {
    this.cartService.deleteProductInCard(po).subscribe((value: ProductOrder[]) => {
      this.productOrders = value;
      this.calculateTotalMoney(value);
      this.toastr.success('Đã xóa sản phẩm ' + po.product.name + ' khỏi giỏ hàng.');
      this.sendMessage();
    }, error => {
      if (error.error.message == 'notfound') {
        this.toastr.warning('Không tìm thấy sản phẩm!');
      }
    });
  }

  sendMessage(): void {
    this.reload.sendUpdate('Success!');
  }

  private onPaymentSuccess() {
    this.cartService.goPayment(this.customer).subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/shop').then(() => {
          this.totalMoney = 0;
          this.toastr.success('Thanh toán thành công');
        });
      }, 500);
    });
    this.sendMessage();
  }
}
