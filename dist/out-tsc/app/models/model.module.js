"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var repository_1 = require("./repository");
// Decorator - provides Angular with metadata about the Repository building block
// begins with @ followed by the decorator type and configuration properties
// specify the required services
var ModelModule = (function () {
    function ModelModule() {
    }
    return ModelModule;
}());
ModelModule = __decorate([
    core_1.NgModule({
        providers: [repository_1.Repository]
    })
], ModelModule);
exports.ModelModule = ModelModule;
//# sourceMappingURL=model.module.js.map