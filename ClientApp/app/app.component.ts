import { Component } from '@angular/core';
import { Repository } from "./models/repository";
import { Product } from "./models/product.model";
import { Supplier } from "./models/supplier.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Angular & ASP.NET Core MVC';

    // this will create a property with the same name, type and access which will be of type Repository which by default is populated with the JSON data from the Index view
    constructor(private repo: Repository) { }

    // the keyword 'this' is necessary
    get product(): Product {
        return this.repo.product;
    }

    get products(): Product[] {
        return this.repo.products;
    }

    createProduct() {
        this.repo.createProduct(new Product(0, "X-Ray Scuba Mask", "Watersports", 49.99, "See what the fish are hiding", this.repo.products[0].supplier));
    }

    createProductAndSupplier() {
        let s = new Supplier(0, "Rocket Shoe Corp", "Boston", "MA");
        let p = new Product(0, "Rocket-Powered Shoes", "Running", 100, "Set a new record", s);
        this.repo.createProductAndSupplier(p, s);
    }

    //title = no_such_object;
}
