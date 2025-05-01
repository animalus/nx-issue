import { Injectable } from "@angular/core";
import { BaseDirective } from "@animalus/core";

@Injectable({
    providedIn: "root",
})
export class GpsService extends BaseDirective {
    constructor() {
        super();
    }

    doSomething() {
        console.log("I'm doing something.");
    }
}
