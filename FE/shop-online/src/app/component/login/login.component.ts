import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/user/login.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../service/user/auth.service';
import {Router} from '@angular/router';
import {ReloadService} from '../../service/user/reload.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account: any;
  loginForm: FormGroup;
  rememberMeBox = false;
  btnLoginStatus = true;
  private subscriptionName: Subscription;
  private messageReceived: any;

  constructor(private loginService: LoginService,
              private toastr: ToastrService,
              private authService: AuthService,
              private reload: ReloadService,
              private router: Router) {
    this.subscriptionName = this.reload.getUpdate().subscribe(message => {
      this.messageReceived = message;
    });
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitLogin() {
    this.btnLoginStatus = false;
    this.account = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loginService.goLogin(this.account).subscribe(value => {
        setTimeout(() => {
          this.router.navigateByUrl('').then(() => {
            this.toastr.success('Đăng nhập thành công');
            this.btnLoginStatus = true;
            this.sendMessage();
          });
        }, 2000);
      }, error => {
        this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng');
        this.btnLoginStatus = true;
      }, () => {
      });
    }
  }

  rememberMe() {
    this.rememberMeBox = !this.rememberMeBox;
    if (this.rememberMeBox) {
      this.account = this.loginForm.value;
      localStorage.setItem('usernameLogin', this.loginForm.value.username.toLowerCase());
      localStorage.setItem('passwordLogin', this.loginForm.value.password);
      this.toastr.success('Đã nhớ mật khẩu');
    } else {
      localStorage.removeItem('usernameLogin');
      localStorage.removeItem('passwordLogin');
      this.toastr.success('Hủy nhớ mật khẩu');
    }
  }

  sendMessage(): void {
    this.reload.sendUpdate('Đăng Nhập thành công');
  }
}
