import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {AuthService} from 'angular2-social-login';
import {Router} from '@angular/router';
import {AccountVerificationService} from '../signup/accountVerification/accountVerification.service';
import {LoginAccount} from '../../../dto/LoginAccount';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import * as ORLPSettings from '../../../services/orlp.settings';
import {AuthorizationService} from '../authorization.service';

@Component({
  templateUrl: ('./login.component.html'),
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captchaComponent: ReCaptchaComponent;
  loginForm: FormGroup;
  success: boolean = false;
  error: boolean = false;
  wrongDetails: boolean = false;
  public user;
  verificationStat: boolean = false;
  account: LoginAccount;
  captcha: string;
  siteKey = ORLPSettings.SITE_KEY;
  UNAUTHORIZED: number = 401;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              public auth: AuthService,
              private router: Router,
              private authorizationService: AuthorizationService,
              private accountVerify: AccountVerificationService) {
  }

  ngOnInit() {
    this.accountVerify.getMessage().subscribe(verifStatus => {
      this.verificationStat = verifStatus;
    });
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  login = () => {
    this.success = false;
    this.error = false;
    this.wrongDetails = false;
    this.account = this.loginForm.value;
    this.account.captcha = this.captcha;
    this.loginService.signIn(this.account)
      .subscribe((response) => {
        this.success = true;
        console.log(response);
        this.router.navigate(['main']);
        this.reload();
      }, (error) => {
        this.processError(error);
        this.captchaComponent.reset();
      });
  }

  private processError(response) {
    this.success = false;
    if (response.status === this.UNAUTHORIZED) {
      this.wrongDetails = true;
    } else {
      this.error = true;
    }
  }

  signInGoogle(provider: string) {
    this.auth.login(provider).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user.idToken);
        console.log(this.user.email);
        this.sendGoogleToken();
      }
    );
  }

  sendGoogleToken() {
    this.authorizationService.sendGoogleIdToken(this.user.idToken)
      .subscribe((response) => {
        this.success = true;
        this.router.navigate(['main']);
        this.reload();
      }, (error) => {
        this.processError(error);
      });
  }

  signInFacebook(provider: string) {
    this.auth.login(provider).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user.token);
        console.log(this.user.email);
        this.sendFacebookToken();
      }
    );
  }

  sendFacebookToken() {
    this.authorizationService.sendFacebookToken(this.user.token)
      .subscribe((response) => {
        this.success = true;
        this.router.navigate(['main']);
        this.reload();
      }, (error) => {
        this.processError(error);
      });
  }

  reload() {
    window.location.reload();
  }

  handleCorrectCaptcha($event) {
    this.captcha = $event;
  }

  validLogin(): boolean {
    return this.loginForm.valid && (this.captcha != null);
  }
}
