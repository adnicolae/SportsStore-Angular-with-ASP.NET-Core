import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

const productsUrl = "/api/products";

@Injectable()
export class Repository {
    private productData: Product;

    // http class provides methods for making http requests
    constructor(private http: Http) {
        this.getProduct(1);
    }

    // sends the request and assigns productData with the data from the response
    getProduct(id: number) {
        this.sendRequest(RequestMethod.Get, productsUrl + "/" + id)
            .subscribe(response => { this.productData = response; });
    }

    // http.request is an Observable<Response> which will produce a Response when the request is complete
    // the map method allows the observable to be transformed by parsing JSON from the HTTP reponse
    private sendRequest(verb: RequestMethod, url: string, data?: any): Observable<any> {
        return this.http.request(new Request({
            method: verb,
            url: url,
            body: data
        })).map(response => response.json());
    }

    get product(): Product {
        console.log("Product Data Requested");
        return this.productData;
    }
}