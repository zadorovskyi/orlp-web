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
var router_1 = require("@angular/router");
var CatalogInfoComponent = (function () {
    function CatalogInfoComponent(route) {
        this.route = route;
        this.table1 = true;
        this.table2 = false;
    }
    CatalogInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.id = id;
        });
    };
    CatalogInfoComponent.prototype.tabClick = function (id) {
        if (id == 1) {
            this.table1 = true;
            this.table2 = false;
        }
        else {
            this.table2 = true;
            this.table1 = false;
        }
    };
    return CatalogInfoComponent;
}());
CatalogInfoComponent = __decorate([
    core_1.Component({
        template: require('app/page/catalogInfo/catalogInfo.component.html!text')
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], CatalogInfoComponent);
exports.CatalogInfoComponent = CatalogInfoComponent;
//# sourceMappingURL=catalogInfo.component.js.map