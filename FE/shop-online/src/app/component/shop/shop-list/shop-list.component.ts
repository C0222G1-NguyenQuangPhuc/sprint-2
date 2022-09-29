import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {CategoryService} from '../../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/user/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ReloadService} from '../../../service/user/reload.service';
import {Product} from '../../../model/product';
import {Subscription} from 'rxjs';
import {ProductOrder} from '../../../model/product-order';
import {Customer} from '../../../model/customer';
import {CartService} from '../../../service/cart.service';
import {CustomerService} from '../../../service/customer.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  products: Product[] = [];
  page = 0;
  nameSearch = '';
  private subscription: Subscription;
  private messageReceived: any;
  customer: Customer;
  loginStatus: any;
  infoStatus = true;
  username = '';
  role = '';
  productDelete: Product;
  nameDelete = '';

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private toastr: ToastrService,
              private reload: ReloadService,
              private cartService: CartService,
              private customerService: CustomerService) {
    this.subscription = this.reload.getUpdate().subscribe(message => {
      this.messageReceived = message;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      if (value.get('name') != null) {
        this.searchByName(value.get('name'));
      } else {
        this.searchByName(this.nameSearch);
      }
    });
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.auth.getRoles().subscribe(resp => {
          this.getRole(resp);
          console.log(this.role);
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

  searchByName(name: string) {
    this.productService.findAllByName(this.page, name).subscribe((value: any) => {
      if (value != null) {
        this.products = value.content;
      } else {
        this.products = [];
        this.toastr.error('Không có sản phẩm nào được tìm thấy');
      }
      this.sendMessage();
    }, error => {
      this.router.navigateByUrl('/404');
    }, () => {
      console.log(this.products);
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

  sendMessage(): void {
    this.reload.sendUpdate('Tải lại danh sách');
  }

  getAllProduct() {
    this.productService.getAllPageProducts(this.page).subscribe((value: any) => {
      this.products = value.content;
    }, error => {
      console.log(error);
      this.router.navigateByUrl('/404');
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productDelete.id).subscribe(value => {
      this.getAllProduct();
      this.toastr.success('Xóa thành công sản phẩm ' + this.productDelete.name);
    }, error => {
      this.toastr.error('Xóa không thành công');
    });
  }

  getInfo(product: Product) {
    this.productDelete = product;
    this.nameDelete = product.name;
  }
}
