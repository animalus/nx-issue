import { Injectable } from "@angular/core";
import { BaseDirective } from "@animalus/core";

@Injectable({
    providedIn: "root",
})
export class AdminService extends BaseDirective {
    constructor() {
        super();
    }

    adminThing() {
        console.log("admin thing");
    }
}
