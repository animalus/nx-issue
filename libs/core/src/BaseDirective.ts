import { Directive, OnDestroy } from "@angular/core";
import { ObjMap } from "@animalus/corejs";
import { merge, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

/**
 * NOTE: Used for Services and is extended by BaseComponent for components
 */
@Directive()
export abstract class BaseDirective implements OnDestroy {
    private _destroyed$: Subject<boolean>;
    private takeUntils: ObjMap<Subject<boolean>>;

    ngOnDestroy() {
        this.complete(this._destroyed$);
    }

    private complete(subject: Subject<boolean>) {
        subject?.next(true);
        subject?.complete();
    }

    private get destroyed$() {
        if (!this._destroyed$) {
            this._destroyed$ = new Subject();
        }
        return this._destroyed$;
    }

    private getTakeUntil(label) {
        if (!this.takeUntils) {
            this.takeUntils = {};
        }
        const subject = new Subject<boolean>();
        this.takeUntils[label] = subject;
        return subject;
    }

    takeUntilDestroyed<T>(
        observable: Observable<T>,
        next: (value: T) => void,
        label?: string,
        error?: (error) => void,
    ) {
        let obs: Observable<boolean>;
        if (label) {
            //
            // If there was a previously defined Subject with this
            // label, then complete it so our old subscription under
            // that label is unsubscribed from in the takeUntil method.
            //
            this.complete(this.takeUntils?.[label]);

            //
            // Merge will emit until any of the observables completes
            // since the stream is now merged. So whether destroyed$ or
            // subject is completed, the merge stream gets it's completed called.
            //
            obs = merge(this.destroyed$, this.getTakeUntil(label));
        } else {
            obs = this.destroyed$;
        }
        observable.pipe(takeUntil(obs)).subscribe({ next, error });
    }
}
