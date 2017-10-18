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
var productsUrl = "/api/products";
var Repository = (function () {
    // http class provides methods for making http requests
    function Repository(http) {
        this.http = http;
        this.getProducts(true);
    }
    // sends the request and assigns productData with the data from the response
    Repository.prototype.getProduct = function (id) {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Get, productsUrl + "/" + id)
            .subscribe(function (response) { _this.product = response.json(); });
    };
    Repository.prototype.getProducts = function (related) {
        var _this = this;
        if (related === void 0) { related = false; }
        this.sendRequest(http_1.RequestMethod.Get, productsUrl + "?related=" + related)
            .subscribe(function (response) { return _this.products = response; });
    };
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