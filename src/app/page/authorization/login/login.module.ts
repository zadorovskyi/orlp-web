import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginService} from './login.service';
import {LoginComponent} from './login.component';
import {Angular2SocialLoginModule} from 'angular2-social-login';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {AuthorizationService} from "../authorization.service";

const providers = {
    'google': {
        'clientId': '109414995516-fftdn22fnpfdh80fgfsvpq1ht97hdkl5.apps.googleusercontent.com'
    },
    'facebook': {
        'clientId': '439882899718340',
        'apiVersion': 'v2.9'
    }
};

@NgModule({
    imports: [
        HttpModule,
        ReCaptchaModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        Angular2SocialLoginModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent},
        ]),
    ],
    exports: [],
    declarations: [
        LoginComponent
    ],
    providers: [LoginService, AuthorizationService],
})
export class LoginModule {
    constructor() { }
}
Angular2SocialLoginModule.loadProvidersScripts(providers);
