import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ModelModule } from "./models/model.module";
import { AppComponent } from './app.component';
import { ProductTableComponent } from "./structure/productTable.component";
import { CategoryFilterComponent } from "./structure/categoryFilter.component";
import { ProductDetailComponent } from "./structure/productDetail.component";

@NgModule({
  declarations: [
      AppComponent,
      ProductTableComponent,
      CategoryFilterComponent,
      ProductDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, ModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
