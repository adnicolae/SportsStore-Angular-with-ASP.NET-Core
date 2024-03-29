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
var repository_1 = require("./models/repository");
var product_model_1 = require("./models/product.model");
var supplier_model_1 = require("./models/supplier.model");
var AppComponent = (function () {
    // this will create a property with the same name, type and access which will be of type Repository which by default is populated with the JSON data from the Index view
    function AppComponent(repo) {
        this.repo = repo;
        this.title = 'Angular & ASP.NET Core MVC';
    }
    Object.defineProperty(AppComponent.prototype, "product", {
        // the keyword 'this' is necessary
        get: function () {
            return this.repo.product;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "products", {
        get: function () {
            return this.repo.products;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.createProduct = function () {
        this.repo.createProduct(new product_model_1.Product(0, "X-Ray Scuba Mask", "Watersports", 49.99, "See what the fish are hiding", this.repo.products[0].supplier));
    };
    AppComponent.prototype.createProductAndSupplier = function () {
        var s = new supplier_model_1.Supplier(0, "Rocket Shoe Corp", "Boston", "MA");
        var p = new product_model_1.Product(0, "Rocket-Powered Shoes", "Running", 100, "Set a new record", s);
        this.repo.createProductAndSupplier(p, s);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [repository_1.Repository])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map