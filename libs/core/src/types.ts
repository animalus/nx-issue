import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import {
    AUApiDef,
    AUApiSet,
    AUApiSets,
    AUTimestamp,
    BBUser,
    Internationalization,
    KeyLabel,
} from "@animalus/corejs";
import { AUFormDef } from "./components/layout/form/types";
import { LoggerDef } from "./logging/types";
import { StaticRoute } from "./markdown/types";
import { ThemeOptions } from "./theme/types";
import { AuthService } from "./user/authService";

export const LANG_KEY = "lang";

export const adminRouteGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).isAdmin();
};

export const anyDataManagerRouteGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).isPublicDM();
};

export const dataManagerRouteGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).isDataManager();
};

export type KeyActionDef = {
    key: string;
    type: string;
    attrKey: string;
    value: any;
};

export type FormControlDef<T> = {
    default?: T;
    type: string; // "STRING", "INT", "FLOAT", "BOOLEAN", <custom_values>
    allowed?: T[];
    required?: boolean;
    readOnly?: boolean;
    multiline?: boolean;
    options?: any;
};

export type FormEntryDef<T> = {
    key: string;
    label?: string;
    array?: FormEntryDef<T>;
    control?: FormControlDef<T>;
    group?: string;
};

export type MediaConfig = {
    tags: string[];
    actions: KeyActionDef[];
    attrs: FormEntryDef<any>[];
};

export type SiteConfig = {
    apiinfo?: AUApiDef | AUApiSet | AUApiSets;
    website?: { baseURL: string; socketURL: string; adminBaseURL: string };
    appid?: string;
    appversion?: string;
    appversioncheck?: boolean;
    theming?: ThemeOptions;
    loggers?: LoggerDef[];
    iconRegistry?: IconRegistryDef;
    header?: { menu: MenuDef };
    footer?: { menu: MenuDef; copyright: string };
    routes?: { static: StaticRoute[] };
    // ping: PingOptions;
    custom?: any;
    media?: MediaConfig | "SERVER";
    systemType?: string;
    i18n?: Internationalization;
};

export type LabeledStringValue = {
    value: string;
    label: string;
};

export type KeyValue<T> = {
    key: string;
    value: T;
};

export type Attributes = any;

export type Attribute = {
    key: string;
    value: any;
};

export type IndexedValue<T> = {
    value: T;
    index: number;
};

export type NameEmail = {
    fullname: string;
    email: string;
};

export type EmailDef = {
    subject: string;
    body: string;
};

export type BBEmailType = {
    subscription?: boolean;
} & KeyLabel;

export type EmailType = {
    template: string;
    required?: boolean;
    admin?: boolean;
    testFormElements?: FormEntryDef<any>[];
    subscription?: boolean;
    formDef: AUFormDef;
} & KeyLabel;

export type SearchResponse<T> = {
    results: T[];
    limitExceeded?: boolean;
    autoSelect?: boolean;
};

export type ProcessEvent<T> = {
    obj?: T;
    canceled?: boolean;
    deleted?: boolean;
    isNew?: boolean;
    needsRefresh?: boolean;
};

export type IconDef = {
    name: string;
    path: string;
};

export type IconMap = {
    key: string;
    jsonURL: string;
};

export type IconRegistryDef = {
    iconMaps?: IconMap[];
    svgIconSetURLs?: string[];
    extraSvgIcons?: IconDef[];
};

export type BusyContext = {
    busy: boolean;
    message?: string;
};

export type BusyOptions = {
    finallyFn?: () => void;
    runInTimeout?: boolean;
    message?: string;
};

export type ConfirmOptions = {
    message?: string;
    title?: string;
    message2?: string;
    cancelText?: string;
    okText?: string;
    yesOverride?: boolean;
};

export type ActionDef<T, R = void> = {
    key?: string;
    icon?: string;
    buttonText?: string;
    tooltip?: string;
    dangerous?: boolean;
    singleOnly?: boolean;
    action: (item: T) => Promise<R>;
    disabled?: () => boolean;
    actionType?: string;
    noBusy?: boolean;
    busyOptions?: BusyOptions;
    confirm?: ConfirmOptions;
    neverDisabled?: boolean;
};

export type ActionPerformed<T> = {
    item: T;
    actionType: string;
};

export type AUActionResult<T> = {
    data: T;
    canceled?: boolean;
};

export class AUAction<T, R = void> {
    constructor(private def: ActionDef<T, R>) {}

    get key() {
        return this.def.key;
    }

    get icon() {
        return this.def.icon;
    }

    get buttonText() {
        return this.def.buttonText;
    }

    get tooltip() {
        return this.def.tooltip;
    }

    get dangerous() {
        return this.def.dangerous;
    }

    get action() {
        return this.def.action;
    }

    get actionType() {
        return this.def.actionType;
    }

    get noBusy() {
        return this.def.noBusy;
    }

    get confirm() {
        return this.def.confirm;
    }

    get busyOptions() {
        return this.def.busyOptions;
    }

    disabled(selected?: T) {
        if (this.def.neverDisabled) {
            return false;
        }
        if (selected !== undefined) {
            if (selected === null) {
                return true;
            }
            if (Array.isArray(selected)) {
                if (selected.length === 0) {
                    return true;
                }

                if (this.def.singleOnly && selected.length !== 1) {
                    return true;
                }
            }
        }

        if (this.def.disabled) {
            return this.def.disabled();
        }
        return false;
    }
}

export type NavbarMenuConfig = {
    asIcon?: boolean;
    showIfBurgered?: boolean;
};

export type MenuDef = {
    //
    // If label = "-" then it is a divider.
    //
    divider?: boolean;
    label?: string;
    menus?: MenuDef[];
    route?: string | any[];
    s?: string;
    icon?: string;
    navbar?: NavbarMenuConfig;
};

export type AUDialogInfo = {
    title?: string;
    icon?: string;
    iconClass?: string;
};

export type SubscriptionEmail = {
    id?: number;
    type: string;
    formObject?: any;
    publishedOn?: AUTimestamp;
    emailedOn?: AUTimestamp;
    createdOn?: AUTimestamp;
    user?: BBUser;
    subject: string;
    body: string;
};

export type RecentSubResponse = {
    label: string;
    subs: SubscriptionEmail[];
};

export type ApiKey = { apikey: string; secret: string };
