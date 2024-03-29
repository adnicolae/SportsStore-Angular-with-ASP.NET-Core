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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var configClasses_repository_1 = require("./configClasses.repository");
var productsUrl = "/api/products";
var suppliersUrl = "/api/suppliers";
var Repository = (function () {
    // http class provides methods for making http requests
    function Repository(http) {
        this.http = http;
        this.filterObject = new configClasses_repository_1.Filter();
        this.suppliers = [];
        //this.filter.category = "soccer";
        this.filter.related = true;
        this.getProduct(1);
        this.getProducts();
    }
    // sends the request and assigns productData with the data from the response
    Repository.prototype.getProduct = function (id) {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Get, productsUrl + "/" + id)
            .subscribe(function (response) { _this.product = response; });
    };
    Repository.prototype.getProducts = function (related) {
        var _this = this;
        if (related === void 0) { related = false; }
        var url = productsUrl + "?related=" + this.filter.related;
        if (this.filter.category) {
            url += "&category=" + this.filter.category;
        }
        if (this.filter.search) {
            url += "&search=" + this.filter.search;
        }
        this.sendRequest(http_1.RequestMethod.Get, url)
            .subscribe(function (response) { return _this.products = response; });
    };
    Repository.prototype.getSuppliers = function () {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Get, suppliersUrl)
            .subscribe(function (response) { return _this.suppliers = response; });
    };
    Repository.prototype.createProduct = function (prod) {
        var _this = this;
        var data = {
            name: prod.name,
            category: prod.category,
            description: prod.description,
            price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };
        this.sendRequest(http_1.RequestMethod.Post, productsUrl, data)
            .subscribe(function (response) {
            prod.productId = response;
            _this.products.push(prod);
        });
    };
    Repository.prototype.createProductAndSupplier = function (prod, supp) {
        var _this = this;
        var data = {
            name: supp.name,
            city: supp.city,
            state: supp.state
        };
        this.sendRequest(http_1.RequestMethod.Post, suppliersUrl, data)
            .subscribe(function (response) {
            supp.supplierId = response;
            prod.supplier = supp;
            _this.suppliers.push(supp);
            if (prod != null) {
                _this.createProduct(prod);
            }
        });
    };
    Object.defineProperty(Repository.prototype, "filter", {
        get: function () {
            return this.filterObject;
        },
        enumerable: true,
        configurable: true
    });
    // http.request is an Observable<Response> which will produce a Response when the request is complete
    // the map method allows the observable to be transformed by parsing JSON from the HTTP reponse
    Repository.prototype.sendRequest = function (verb, url, data) {
        return this.http.request(new http_1.Request({
            method: verb,
            url: url,
            body: data
        })).map(function (response) { return response.json(); });
    };
    return Repository;
}());
Repository = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Repository);
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map