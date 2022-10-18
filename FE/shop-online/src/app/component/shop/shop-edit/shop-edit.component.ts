import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProductService} from '../../../service/product.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../service/category.service';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {
  formEdit: FormGroup;
  product: Product;
  categories: Category[] = [];
  selectedImage: any;
  imgSrc = '../assets/img/no-image.jpg';

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private productService: ProductService,
              private toastr: ToastrService,
              private router: Router,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe( categories => {
      this.categories = categories;
    });
    this.route.paramMap.subscribe( value => {
      this.findProductById(value.get('id'));
    });
  }

  findProductById(id: string) {
    this.productService.findProductById(id).subscribe((value: Product) => {
      this.product = value;
      this.editForm();
      console.log(this.product);
    }, error => {
    }, () => {
      // $('#previewImage').attr('src', this.product.image);
    });
  }

  editForm() {
    this.imgSrc = this.product.image;
    this.formEdit = new FormGroup({
      id: new FormControl(this.product.id),
      name: new FormControl(this.product.name),
      releaseTime: new FormControl(this.product.releaseTime),
      manufactureTime: new FormControl(this.product.manufactureTime),
      manufacturer: new FormControl(this.product.manufacturer),
      price: new FormControl(this.product.price),
      warranty: new FormControl(this.product.warranty),
      quantity: new FormControl(this.product.quantity),
      image: new FormControl(this.product.image),
      category: new FormControl(this.product.category),
    });
  }

  editSave() {
    const productEdit: Product = this.formEdit.value;
    if (this.selectedImage == null) {
      this.productService.updateProduct(productEdit).subscribe(value => {
        this.router.navigateByUrl('/shop').then(() => {
          this.toastr.success('Chỉnh sửa thành công!');
        });
      });
    } else {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            productEdit.image = url;
            this.productService.updateProduct(productEdit).subscribe(value => {
              this.router.navigateByUrl('/shop').then(() => {
                this.toastr.success('Chỉnh sửa thành công!');
              });
            });
          });
        })
      ).subscribe();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (o: any) => this.imgSrc = o.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }

  compareCategory(c1: Category, c2: Category) {
    if (c1 != null && c2 != null) {
      return c1.id == c2.id;
    }
  }

}
