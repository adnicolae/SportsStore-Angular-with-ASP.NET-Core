import { Component } from '@angular/core';
import { Repository } from "./models/repository";
import { Product } from "./models/product.model";

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

    //title = no_such_object;
}
