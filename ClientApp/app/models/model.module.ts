import { NgModule } from "@angular/core";
import { Repository } from "./repository";

// Decorator - provides Angular with metadata about the Repository building block
// begins with @ followed by the decorator type and configuration properties
// specify the required services
@NgModule({
    providers: [Repository]
})

export class ModelModule { }