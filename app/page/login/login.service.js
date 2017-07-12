"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var templateUrl_1 = require("../../interfaces/templateUrl");
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this._controllerUrl = 'http://localhost:8080/auth';
    }
    LoginService.prototype.sendIdToken = function (idToken) {
        console.log(idToken);
        return this.http.post(templateUrl_1.Template.url + "/api/auth/google", idToken, {})
            .map(function (response) { return console.log(response); })
            .catch(this.handleErrorObservable);
    };
    LoginService.prototype.login = function (account) {
        console.log(account);
        return this.http.post(this._controllerUrl, account).map(this.extractData)
            .catch(this.handleErrorObservable);
    };
    LoginService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    LoginService.prototype.handleErrorObservable = function (error) {
        return Observable_1.Observable.throw(error.message || error);
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map