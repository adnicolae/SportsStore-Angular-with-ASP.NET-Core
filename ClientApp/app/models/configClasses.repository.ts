﻿// class used to specify filtering that will be applied to product data
export class Filter {
    category?: string;
    search?: string;
    related: boolean = false;

    reset() {
        this.category = this.search = null;
        this.related = false;
    }
}