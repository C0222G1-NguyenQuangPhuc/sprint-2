import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/user/login.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../service/user/auth.service';
import {Router} from '@angular/router';
import {ReloadService} from '../../service/user/reload.service';
import {Subscription} from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

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
  user: SocialUser;
  loggedIn: boolean;

  constructor(private loginService: LoginService,
              private toastr: ToastrService,
              private authService: AuthService,
              private reload: ReloadService,
              private router: Router,
              private social: SocialAuthService) {
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

  signInWithFB(): void {
    this.social.authState.subscribe(user => {
      console.log(user);
      this.loginService.goLogin({username: user.email, password: user.id}).subscribe(() => {
        setTimeout(() => {
          this.router.navigateByUrl('').then(() => {
            this.toastr.success('Đăng nhập thành công');
            this.btnLoginStatus = true;
            this.sendMessage();
            console.log(user);
          });
        }, 2000);
      });
    }, error => {
      this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng');
      console.log('error login');
      this.btnLoginStatus = true;
    });
    this.social.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.social.signOut();
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
