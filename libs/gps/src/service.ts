import { Injectable } from "@angular/core";
import { BaseDirective } from "@animalus/core";

@Injectable({
    providedIn: "root",
})
export class MyService extends BaseDirective {
    constructor() {
        super();
    }

    doIt() {
        console.log("doing it.");
    }
}
